import React from 'react';
import { ReactMic } from 'react-mic';
import {connect} from 'react-redux'
//const serverURL = 'http://localhost:3000'
const serverURL = 'http://10.185.3.158:3000'

const mapStateToProps = state =>{
  return  { 
           record: state.record,
           blobURL:state.blobURL,
           blobString: state.blobString,
           roomId: state.roomId,
           liveMode: state.liveMode,
           startedTimestamp:"",
           mySongs: state.mySongs
           //blobObj: state.blobObj
          }
}
   
const mapDispatchToProps = {
    changeRecordStatus: (status) => ({type: 'CHANGE_RECORD_STATUS', record:status}),
    saveBlobURL: (blobURL) =>({type: 'BLOBURL', blobURL:blobURL}),
    saveBlobString: (blobString)=> ({type: 'BLOBSTRING', blob:blobString}),
    saveRoomId: (roomId) => ({type: 'ROOMID', roomId:roomId}),
    createTimestamp: (timestamp) => ({type: 'TIMESTAMP', startedTimestamp:timestamp}),
    fetchSongs: (userSongs)=> ({type: 'USER_SONGS', mySongs:userSongs})
    //saveBlobObj: (blobObj) => ({type: 'BLOBOBJ', blobObj:blobObj}) 
}

export default connect(mapStateToProps, mapDispatchToProps)(
 class Recorder extends React.Component {
    
      startRecording = () => {
        this.props.changeRecordStatus(true)
        const date = new Date()
        const startedTimestamp = (date.getTime() %6000/1000 )//.toFixed(0)
        this.props.createTimestamp(startedTimestamp)     
      }
    
      stopRecording = () => {
        this.props.changeRecordStatus(false)
      }
    
      onData = (recordedBlob)=> {
       
        console.log('chunk of real-time data is:: ', recordedBlob.blobURL);
        console.log(this.props.liveMode)
            if(this.props.liveMode == true){
            this.props.sendAudioBuffer(recordedBlob)
             }        
      }
    
      onStop = (recordedBlob)=> {
        this.props.changeRecordStatus(false)
        this.props.saveBlobURL(recordedBlob.blobURL)
        //this.props.saveBlobObj(recordedBlob.blob)// recordedBlob
        this.props.abort()

        const reader = new FileReader() 
        reader.readAsDataURL(recordedBlob.blob) 


        //convert blob into base64data
        let data = ""
        reader.onloadend = ()=> {
         data = reader.result;
         //data:audio/webm;codecs=opus;base64,
         data = data.split('base64,')[1]
         this.props.saveBlobString(data)
        }
        console.log(recordedBlob.blob)
        console.log('recordedBlob is: ', recordedBlob.blobURL);
      }


     onSave = e =>{
       e.preventDefault();
       const songName = prompt('Please enter your song name:')
        if(songName.length && this.props.blobString !== ""){
           console.log(this.props.blobString)
          // save this into database by fetch post method
            fetch(`${serverURL}/recorded-songs`, {
              method: "POST",
              headers:{
                "Access-Control-Allow-Origin":"*",
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: JSON.stringify({
                name: songName,//e.target.children[3].value,
                likes: 0,
                blobURL: this.props.blobString
              })
            
            })
           
        }else if(songName.length == 0){
           alert('Song name can not be empty!')
        }  
       
        console.log(songName)
     }
    
    render(){
        return(
            <div class = "main-page" style = {{marginLeft:"23%"}}>
            <button id = "triangle" style ={{background:'transparent'}} onClick={this.startRecording} type="button"></button><br/>
            <button id = "round"  onClick={this.stopRecording} type="button">Stop</button><br/>
            <ReactMic style ={{position:'absolute'}} record={this.props.record} className="sound-wave" onStop={this.onStop} onData={this.onData}
              strokeColor="#000000" backgroundColor="white" nonstop={true} duration={5}/>
              <form id = "save-form" onSubmit = {this.onSave} action ="/recorded-songs" method = "POST" >
               
                <input id = 'save-btn' type = "submit" value = "save"/>
              </form>
              <article class="clip">
              <audio style = {{display:'flex',width:'700px',opacity: '0.5'}} ref = "audioSource" controls = "controls" src = {this.props.blobURL} ></audio>
              </article>
              
            </div>
          
        )
    }
}
)

