import React from 'react';
import {connect} from 'react-redux'
//const serverURL = 'http://localhost:3000'
const serverURL = 'http://10.185.3.158:3000'

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
                        <li id = {song.id} style = {{marginRight:'1%'}}>{song.name}
                            <audio controls>
                                <source src = {`data:audio/webm;codecs=opus;base64,${song.blobURL}`}/>
                            </audio>
                            <button onClick = {this.deleteSong}>Delete</button>
                        </li>)}
                  </ul>
               </div>
           )
       }
   }
)