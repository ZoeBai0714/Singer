import React from 'react';
import { ReactMic } from 'react-mic';
import socketIO from 'socket.io-client';
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
        console.log()
      }
      
    //  play = () =>{
    //    const audio = new Audio(this.state.audioSrc)
    //    audio.play() 
    //    console.log('you reached me')      
    //  }
 
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
           </div>
        )
    }
}

/*
 audioURL = window.URL.createObjectURL(blob);
  audio.src = audioURL;
*/
