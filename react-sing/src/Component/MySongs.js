import React from 'react';
import { ReactMic } from 'react-mic';
const serverURL = 'http://localhost:3000'

export default class MySongs extends React.Component {
    state = {
        mySongs:[]
    }

    componentDidMount(){
      fetch(`${serverURL}/users/1/recorded-songs`)
      .then(res => res.json())
      .then(userSongs => {
          this.setState({
              mySongs:userSongs
          })
        console.log(this.state.mySongs)  
      })
    }

   render(){
       return(
           <div>
               <h3>My songs</h3>
               <ul>{this.state.mySongs.map(song => 
                   <li>
                   <audio ref = "audioSource" controls = "controls" src = {song.blobURL} ></audio>
                  </li>)}
               </ul>
           </div>
       )
   }
}