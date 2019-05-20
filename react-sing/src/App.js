import React from 'react';
import SearchBar from './Component/SearchBar'
import SongList from './Component/SongList'
import Recorder from './Component/Recorder'
import Comment from './Component/Comment'
import socketIO from 'socket.io-client';
import MySongs from './Component/MySongs';
//const io = socketIO('localhost:3000/')
 const io = socketIO('http://10.185.6.102:3000/')

const MainPage = () => (
  <div></div>
)

class App extends React.Component {
  state = {
    songIds: [],
    handle: "",
    comment: ""
  } 

  // pass videoIds to songList 
  songList = (songIds) => {
    this.setState({
      songIds: songIds
    })
  }  

  reaction = (e) => {
    e.preventDefault()
    io.emit('comment', {
      message: e.target.children[2].value,
      handle: e.target.children[0].value,
    })
    this.setState({
      handle: e.target.children[0].value,
      comment: e.target.children[2].value
    })
  }




  componentDidMount() {
    var sourceBuffer, audioElement, mediaSource
    io.on('comment', messageData => {
      const commentArea = document.getElementById('output')
      return commentArea.innerHTML += '<p>' + messageData.handle + ':' + messageData.message + '</p>'
    })
        io.on('audioBuffer', (arrayBuffer) => {
          if(sourceBuffer && !sourceBuffer.updating) sourceBuffer.appendBuffer(arrayBuffer);
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
            var mime = "audio/webm;codecs=opus";
            var mediaSource = e.target;
            sourceBuffer = mediaSource.addSourceBuffer(mime);        
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
      // {
      //   bufferData: bufferData
      //  }
      
  render() {
    return (
      <div>
        <SearchBar songList={this.songList} />
        <SongList songIds={this.state.songIds} />
        <Recorder sendAudioBuffer={this.sendAudioBuffer} />
        <Comment reaction={this.reaction} handle={this.state.handle} comment={this.state.comment}  /*displayComments = {this.displayComments}*/ />
        <MySongs />
      </div>

    )
  }
}


export default App;
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