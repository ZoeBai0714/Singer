import React from 'react';
import {connect} from 'react-redux'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import Home from './Containers/Home'
import SearchBar from './Component/SearchBar'
import SongList from './Component/SongList'
import Recorder from './Component/Recorder'
import Comment from './Component/Comment'
import socketIO from 'socket.io-client';
import MySongs from './Component/MySongs'; 
const io = socketIO('localhost:3000/')
//const io = socketIO('http://10.185.6.102:3000/')

const MainPage = (props) => (
  <div>
        <SearchBar songList={props.songList} />
        <SongList songIds={props.songIds} />
        <Recorder sendAudioBuffer={props.sendAudioBuffer} abort={props.abort} />
        <Comment reaction={props.reaction} username={props.username} comment={props.comment}  /*displayComments = {this.displayComments}*/ />
        <MySongs />
  </div>
)
  
const mapStateToProps = state =>{
  return {
    songIds: state.songIds, 
    username: state.username,
    comment: state.comment,
    login: state.login
         }
}

const mapDispatchToProps = {
  getSongIds: (songIds) => ({type: 'SONGIDS', songIds: songIds}),
  getUsername: (username) => ({type: 'USERNAME', username:username}),
  userComment: (comment) => ({type: 'COMMENT', comment:comment})
}

export default connect (mapStateToProps, mapDispatchToProps )(
class App extends React.Component {
  
  // pass videoIds to songList 
  songList = (songIds) => {
    this.props.getSongIds(songIds)
  }  

  reaction = (e) => {
    e.preventDefault()
    io.emit('comment', {
      message: e.target.children[2].value,
      username: e.target.children[0].value,
    })

    this.props.getUsername(e.target.children[0].value)
    this.props.userComment(e.target.children[2].value)
   
  }


  componentDidMount() {
    var sourceBuffer, audioElement, mediaSource
    io.on('comment', messageData => {
      const commentArea = document.getElementById('output')
      return commentArea.innerHTML += '<p>' + messageData.username + ':' + messageData.message + '</p>'
    })
        io.on('audioBuffer', (arrayBuffer) => {
          console.log('getting packet')
          if(sourceBuffer && !sourceBuffer.updating) {
            console.log('in here?')
            sourceBuffer.appendBuffer(arrayBuffer);
          } else {
            function delayBuffer(){
              sourceBuffer.appendBuffer(arrayBuffer)
              sourceBuffer.removeEventListener('updateend',  delayBuffer)
            }
            sourceBuffer.addEventListener('updateend', delayBuffer)
          }
        })

        io.on('abort', () =>{
          sourceOpen()
        })


        function sourceOpen(){ 
          audioElement = document.createElement('audio');
          mediaSource = new MediaSource();
          audioElement.src = URL.createObjectURL(mediaSource);
          audioElement.autoplay = true
          mediaSource.addEventListener('sourceopen', e => {
            // console.log('h i')
            var mime = "audio/webm;codecs=opus";
            var mediaSource = e.target;
            sourceBuffer = mediaSource.addSourceBuffer(mime);
            mediaSource.addEventListener('sourceended', console.log)        
          });
        }
        sourceOpen()
      }

      abort = () =>{
      io.emit('abort')
      }

      sendAudioBuffer = bufferData => {
        
        io.emit('audioBuffer', bufferData)
      }

      
  render() {
    return (
      <BrowserRouter>
         <Route exact path = '/singer' render = {() =>this.props.login == true? (<Redirect to ='/my-page'/>): (<Home/>) } />
         <Route exact path = '/my-page' render = {() =>this.props.login == true?(<MainPage
          songList={this.songList} songIds = {this.props.songIds} sendAudioBuffer={this.sendAudioBuffer} abort={this.abort} 
          reaction={this.reaction} username={this.props.username} comment={this.props.comment}/>): (<Home/>)
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