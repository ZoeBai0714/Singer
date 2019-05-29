import React from 'react';
import {connect} from 'react-redux'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Home from './Containers/Home'
import SearchBar from './Component/SearchBar'
import Recorder from './Component/Recorder'
import MySongs from './Component/MySongs'
import Comment from './Component/Comment'
import SoundEffect from './Component/SoundEffect'
import LiveStreamSocket from './Component/LiveStreamSocket'
import Nav from './Component/Nav'; 
import {io} from './Component/IO'
import background from './assets/background2.jpg'
const URL = 'http://10.185.3.158:3001'
//const io = socketIO('localhost:3000/')
//const io = socketIO('http://10.185.2.248:3000/')
//window.io = io
const MainPage = (props) => (
  <div>
     <img id="background" src = {background}/>
     <span style = {{textDecoration: 'none',position:'absolute',display:'flex',fontSize:'25px', fontFamily: 'Arial ',fontStyle: 'bold', color:'white', fontStyle:'italic', opacity:'0.8'}}>Welcome {localStorage.username}</span>
     <Link to= '/singer' style = {{fontColor:'white',fontSize:'25px',textDecoration: 'none', marginLeft:'90%', marginTop:'5%'}} onClick = {props.logout}>Logout</Link>
        <Nav />
        <LiveStreamSocket/>
        <SearchBar songList={props.songList} />
        <Recorder  sendAudioBuffer={props.sendAudioBuffer} abort={props.abort} />
        <MySongs/>
        {props.liveMode == true?  <p style = {{textAlign:'center', fontStyle:"italic", fontSize:'20px', color:'white'}}>You are now in livemode, your room number is {props.roomId}, invite your friends to join your live!</p> : null}  
        {props.liveMode == true?  <SoundEffect /> : null} 
        {props.liveMode == true?  <Comment /* reaction={this.props.reaction} username={this.props.username} comment={this.props.comment}*/ /> : null}
  </div>
) 
  
const mapStateToProps = state =>{
  return {
    songIds: state.songIds, 
    mySongs:state.mySongs,
    username: state.username,
    comment: state.comment,
    login: state.login,
    roomId: state.roomId,
    liveMode:state.liveMode,
    usersInTheRoom: state.usersInTheRoom,
    startedTimestamp:state.startedTimestamp
         }
}

const mapDispatchToProps = {
  getSongIds: (songIds) => ({type: 'SONGIDS', songIds: songIds}),
  getUsername: (username) => ({type: 'USERNAME', username:username}),
  userComment: (comment) => ({type: 'COMMENT', comment:comment}),
  loginStatus: (status) => ({type: 'LOGIN', login:status})
}

export default connect (mapStateToProps, mapDispatchToProps )(
class App extends React.Component {
  
  // pass videoIds to songList 
  songList = (songIds) => {
    this.props.getSongIds(songIds)
  }  

  componentDidMount() {
    var sourceBuffer, audioElement, mediaSource
   
      console.log(io)
      const queue = []

        io.on('new audioBuffer', (data) => {
          console.log('I am singing live')
          console.log(data)
          queue.push(data.arrayBuffer)
          if(!sourceBuffer) sourceOpen(data.timetamp)
          else if(queue.length === 1) feedBuffer()
        })

        const feedBuffer = (e) => {
          if(sourceBuffer && queue.length && !sourceBuffer.updating) sourceBuffer.appendBuffer(queue.shift())
        }
       

        io.on('abort', () =>{
          sourceOpen()
        })


        function sourceOpen(timestamp = false){ 
          audioElement = document.createElement('audio');
          mediaSource = new MediaSource();
          audioElement.src = window.URL.createObjectURL(mediaSource);
          audioElement.autoplay = true
          mediaSource.addEventListener('sourceopen', e => {
            // console.log('h i')
            var mime = "audio/webm;codecs=opus";
            var mediaSource = e.target;
            sourceBuffer = mediaSource.addSourceBuffer(mime);
            if(timestamp) sourceBuffer.timestampOffset = timestamp
            sourceBuffer.addEventListener('updateend', feedBuffer)
            mediaSource.addEventListener('sourceended', e => {
              console.log('here@')
              sourceBuffer = null
            }) // mad josh       
            feedBuffer()          
          });
        }
      }

      abort = () =>{
      io.emit('abort')
      }

      sendAudioBuffer = bufferData => {
        console.log('I am here')
        console.log(this.props.roomId)
        console.log(MediaSource.readyState)
        //create timestamp for started

        //create timestamp for now
        const date = new Date()
        const now = (date.getTime() % 6000/1000)//.toFixed(0)
        console.log(now)
        console.log(this.props.startedTimestamp)
        io.emit('audioBuffer', {bufferData:{ arrayBuffer: bufferData, timstamp: now - this.props.startedTimestamp}, roomId:this.props.roomId})
      }
      
      logout = () =>{
        console.log('you reached me')
        this.props.loginStatus(false)
        localStorage.clear()
      }

      componentWillUnmount(){
        io.off('broadcast message', this.props.saveComment)
        io.off('new user')
    }
      
  render() {
    console.log(localStorage)

    return (
      <BrowserRouter>
         <Route exact path = '/singer' render = {() =>this.props.login == true && localStorage.token.length > 0? (<Redirect to = '/my-page'/>): (<Home/>) } />
         <Route exact path = '/my-page' render = {() => localStorage.token?(<MainPage
          songList={this.songList} songIds = {this.props.songIds} sendAudioBuffer={this.sendAudioBuffer} abort={this.abort} 
          username={this.props.username} comment={this.props.comment} mySongs = {this.props.mySongs} logout = {this.logout} 
          liveMode = {this.props.liveMode} roomId = {this.props.roomId}/>): (<Home/>)
          }/>
      </BrowserRouter>
    )
  }
}
)

// export default App;
 /*
 const handleSubmit = (e) =>{
   e.preventDefault()
   let request = gapi.client.youtube.search.list({
     part:"snippet",
     channelId:"UCwTRjvjVge51X-ILJ4i22ew",
     q:e.target.value
   })
 }

 const init = () =>{
   gapi.client.setApiKey("AIzaSyBlG_6DX-JMovaElRRI4KqXl_k0KAyHH_0");
   gapi.client.load("youtube", "v3", function(){

   })
 }
 */