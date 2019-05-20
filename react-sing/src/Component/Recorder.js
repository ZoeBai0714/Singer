import React from 'react';
import { ReactMic } from 'react-mic';
import {connect} from 'react-redux'
import socketIO from 'socket.io-client';
const serverURL = 'http://localhost:3000'
const io = socketIO('localhost:3000/')
// const io = socketIO('http://10.185.5.84:3000/')

const mapStateToProps = state =>{
  return  { 
           record: state.record,
           blobURL:state.blobURL,
           blobString: state.blobString
          }
}

const mapDispatchToProps = {
    changeRecordStatus: (status) => ({type: 'CHANGE_RECORD_STATUS', record:status}),
    saveBlobURL: (blobURL) =>({type: 'BLOBURL', blobURL:blobURL}),
    saveBlobString: (blobString)=> ({type: 'BLOBSTRING', blob:blobString}) 
}

export default connect(mapStateToProps, mapDispatchToProps)(
 class Recorder extends React.Component {
    
      startRecording = () => {
        this.props.changeRecordStatus(true)
        // start converting blob into buffer for live stream
        // setTimeout(this.onData, 1000)
      }
    
      stopRecording = () => {
        this.props.changeRecordStatus(false)
      }
    
      onData = (recordedBlob)=> {
        console.log('chunk of real-time data is: ', recordedBlob.blobURL);
        // fetch(recordedBlob)
        //   .then(res => res.arrayBuffer())
        //   .then(bufferData => {
          //console.log(recordedBlob)
               // real-time 
              //this.props.sendAudioBuffer(recordedBlob)
          // }
          ///*console.log(bufferData)*/)
      }
    
      onStop = (recordedBlob)=> {
        this.props.changeRecordStatus(false)
        this.props.saveBlobURL(recordedBlob.blobURL)
        //this.props.abort(recordedBlob)

        const reader = new FileReader() 
        reader.readAsDataURL(recordedBlob.blob);


        //convert blob into base64data
        let data = ""
        reader.onloadend = ()=> { 
         data = reader.result;
         //data:audio/webm;codecs=opus;base64,
         data = data.split('base64,')[1]
         this.props.saveBlobString(data)
        }
        console.log('recordedBlob is: ', recordedBlob.blobURL);
      }


     onSave = e =>{
       e.preventDefault();

      //  const formData = {}
      //  formData['name'] = e.target.children[3].value

      //  const formData = new FormData()
      //  formData.append('name', e.target.children[3].value)
      //  formData.append('blob', blobThingy)
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
            blobURL: this.props.blobString
          })
        
        })
     }      
      
    
    render(){
      console.log(this.props.blobString)
      //const {blobURL} = this.state
        return(
           <div>
           <ReactMic record={this.props.record} className="sound-wave" onStop={this.onStop} onData={this.onData}
            strokeColor="#000000" backgroundColor="#FF4081" nonstop={true} duration={5} />
            <button onClick={this.startRecording} type="button">Start</button>
            <button onClick={this.stopRecording} type="button">Stop</button>

           
            <article class="clip">
            <audio ref = "audioSource" controls = "controls" src = {this.props.blobURL} ></audio>
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
)

/*

*/
