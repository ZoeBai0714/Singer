import React from 'react';
import { ReactMic } from 'react-mic';
import socketIO from 'socket.io-client';
const serverURL = 'http://localhost:3000'
const io = socketIO('localhost:3000/')
// const io = socketIO('http://10.185.5.84:3000/')

// import AudioContext from './AudioContext';
// import AudioPlay from './AudioPlay'
export default class Recorder extends React.Component {
    state = {
        record: false
    }

    startRecording = () => {
        this.setState({
          record: true
        });
        // start converting blob into buffer for live stream
        // setTimeout(this.onData, 1000)
      }
    
      stopRecording = () => {
        this.setState({
          record: false
        }); 

      }
    
      onData = (recordedBlob)=> {
        //console.log('chunk of real-time data is: ', recordedBlob);
        // fetch(recordedBlob)
        //   .then(res => res.arrayBuffer())
        //   .then(bufferData => {
          console.log(recordedBlob)
               // real-time 
              //this.props.sendAudioBuffer(recordedBlob)
          // }
          ///*console.log(bufferData)*/)
      }
    
      onStop = (recordedBlob)=> {
        console.log('recordedBlob is: ', recordedBlob);
        this.setState({
            record:false,
            blobURL: recordedBlob.blobURL
        })
        //this.props.abort(recordedBlob)
        console.log(recordedBlob.blobURL)
      }

     onSave = e =>{
       e.preventDefault();
       console.log(e.target.children[3].value)
       // save this into database by fetch post method
        fetch(`${serverURL}/recorded-songs`, {
          method: "POST",
          headers:{
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            name: e.target.children[3].value,
            likes: 0,
            blobURL: this.state.blobURL
          })
        }).then(res => res.json())
          .then(data => console.log(data)) 
       
     }      
      
    
    render(){
      const {blobURL} = this.state
        return(
           <div>
           <ReactMic record={this.state.record} className="sound-wave" onStop={this.onStop} onData={this.onData}
            strokeColor="#000000" backgroundColor="#FF4081" nonstop={true} duration={5} />
            <button onClick={this.startRecording} type="button">Start</button>
            <button onClick={this.stopRecording} type="button">Stop</button>

           
            <article class="clip">
            <audio ref = "audioSource" controls = "controls" src = {blobURL} ></audio>
            <button>Delete</button>
            </article>

            <form onSubmit = {this.onSave} action ="/recorded-songs" method = "POST" >
              <label>Save your song</label><br/>
              <label for = "song-name">Song name:</label>
              <input type = "text" name = "song-name" /><br/>           
              <input type = "submit" value = "save"/>
            </form>
            
           </div>
        )
    }
}

/*
 audioURL = window.URL.createObjectURL(blob);
  audio.src = audioURL;
*/
