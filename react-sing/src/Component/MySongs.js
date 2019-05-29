import React from 'react';
import {connect} from 'react-redux';
import deleteBtn from '../assets/delete.png';
import editBtn from '../assets/edit.png';

//const serverURL = 'http://localhost:3000'
const serverURL = 'http://10.185.7.76:3000'

const mapStateToProps = state =>{
     return { 
         userId: state.userId,
         mySongs: state.mySongs
         }
}
 
const mapDispatchToProps = {
    fetchSongs: (userSongs)=> ({type: 'USER_SONGS', mySongs:userSongs})
 
}
export default connect(mapStateToProps, mapDispatchToProps)(

   class MySongs extends React.Component {
      
       deleteSong = (e) =>{
        const songId = e.target.parentElement.id   
           fetch(`${serverURL}/recorded-songs`, {
               method: 'DELETE',
               headers:{
                "Content-Type": "application/json",
                Accept: "application/json"
               },
               body: JSON.stringify({
                    songId:songId
               })
           })
            //Update the browser with new song list
           fetch(`${serverURL}/users/${localStorage.userid}/recorded-songs`) 
           .then(res => res.json())
           .then(userSongs =>{ 
                   this.props.fetchSongs(userSongs)
               }) 
        
       }
     
       editSong = (e) =>{
           const songName = prompt('Please enter your new song name')
           const songId = e.target.parentElement.id   
           if(songName){
                fetch(`${serverURL}/recorded-songs`, {
                    method: 'PATCH',
                    headers:{
                    "Content-Type": "application/json",
                    Accept: "application/json"
                    },
                    body: JSON.stringify({
                        name: songName,
                        id: songId
                    })
                })
           }

           fetch(`${serverURL}/users/${localStorage.userid}/recorded-songs`) 
           .then(res => res.json())
           .then(userSongs =>{ 
                   this.props.fetchSongs(userSongs)
               }) 
       }
    /// infinite loop   
    //    componentDidUpdate(prevProps, prevState){
    //       if(this.props.mySongs !== prevProps.mySongs){
    //         fetch(`${serverURL}/users/${localStorage.userid}/recorded-songs`) 
    //         .then(res => res.json())
    //         .then(userSongs =>{ 
    //                 this.props.fetchSongs(userSongs)
    //             }) 
    //       }
    //    }


       render(){
           return(
               <div>
                   <ul id = "song-list">
                       <h1>My Songs</h1>
                        {this.props.mySongs.map(song => 
                        <li id = {song.id} style = {{marginRight:'1%', fontFamily:'Arial'}}>{song.name}
                            <audio controls >
                                <source src = {`data:audio/webm;codecs=opus;base64,${song.blobURL}`}/>
                            </audio>
                            <img class = "deleteBtn" src = {deleteBtn} onClick = {this.deleteSong}/>
                            <img class = "editBtn" src = {editBtn} onClick = {this.editSong}/>
                        </li>)}
                  </ul>
               </div>
           )
       }
   }
)