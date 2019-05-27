import React from 'react'
import {connect} from 'react-redux'
import {io} from './IO'
import applause from '../Audio/applause.mp3'
import boo from '../Audio/boo.mp3'
import whistle from '../Audio/whistle.mp3'
const mapStateToProps = state =>{
   return{
       roomId: state.roomId,
       liveMode: state.liveMode
   }
}

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(class SoundEffect extends React.Component {
   componentDidMount(){
      io.on('play applause', sound => {
         console.log(sound)
         this.playApplause()
      })

      io.on('play boo', sound => {
         console.log(sound)
         this.playBoo()
      })

      io.on('play whistle', sound => {
         console.log(sound)
         this.playWhistle()
      })
   }
   
   parentDiv = () =>{
      const div = document.getElementById('sound-effect')
      return div
   }

   applause = () =>{
     this.playApplause()
     this.sendApplause()
   }

   boo = () =>{
      this.playBoo()
      this.sendBoo()
   }

   whistle = () =>{
      this.playWhistle()
      this.sendWhistle() //Import file then
   }

   playApplause = () =>{
      const div = this.parentDiv() 
      const applauseAudio = document.createElement('audio')
      applauseAudio.src = applause
      div.append(applauseAudio)
      applauseAudio.autoplay = true
   }

   sendApplause = () =>{
      const roomId = this.props.roomId
      io.emit('applause', {sound: applause, roomId:roomId})
   }

   playBoo = () =>{
      const div = this.parentDiv() 
      const booAudio = document.createElement('audio')
      booAudio.src = boo
      div.append(booAudio)
      booAudio.autoplay = true
   }

   sendBoo = () =>{
      const roomId = this.props.roomId
      io.emit('boo', {sound: boo, roomId:roomId})
   }

   playWhistle = () =>{
      const div = this.parentDiv() 
      const whistleAudio = document.createElement('audio')
      whistleAudio.src = whistle
      div.append(whistleAudio)
      whistleAudio.autoplay = true
   }

   sendWhistle = ()=>{
      const roomId = this.props.roomId
      io.emit('whistle', {sound: whistle, roomId:roomId}) 
   }

    render(){
        return(
            <div id = "sound-effect" class = "live">
               <span><button class = "sound-effect applause" onClick = {this.applause}>Applause</button></span>
               <span><button class = "sound-effect boo" onClick = {this.boo}>Boo</button></span>
               <span><button class = "sound-effect whistle" onClick = {this.whistle}>Whistle</button></span>
            </div>
        )
    }
}
)