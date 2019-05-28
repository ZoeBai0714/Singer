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

       render(){
           return(
               <div>
                   <ul id = "song-list">
                       <h1>My Songs</h1>
                        {this.props.mySongs.map(song => 
                        <li style = {{marginRight:'1%'}}>{song.name}
                            <audio controls>
                                <source src = {`data:audio/webm;codecs=opus;base64,${song.blobURL}`}/>
                            </audio>
                        </li>)}
                  </ul>
               </div>
           )
       }
   }
)