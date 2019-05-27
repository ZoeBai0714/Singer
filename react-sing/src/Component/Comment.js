import React from 'react';
import {connect} from 'react-redux'
import {io} from './IO'
//const io = socketIO('http://10.185.2.248:3000/')

window.io = io

const mapStateToProps = state =>{
    return{
        username: state.username,
        roomId: state.roomId,
        liveMode: state.liveMode
    }
}

const mapDispatchToProps = {
    getUsername: (username) => ({type: 'USERNAME', username:username})
}

export default connect(mapStateToProps, mapDispatchToProps)(
class Comment extends React.Component{

    componentDidMount(){
       
          io.on('connection', (socket) =>{
           //////////////////////////Live Chat////////////////////
          })
          // receive new uer join info
          io.on('new user', who => {
              console.log(`${who} has joined the room`)
           })

          // receive incoming messages
          io.on('broadcast message', message=>{
              console.log(message);
              console.log(localStorage)
              const commentArea = document.getElementById('output')
              return commentArea.innerHTML +=` <p>${message.user}: ${message.message}</p>`
            })
       
    }

    sendMessage = (e) =>{
       e.preventDefault()
       const name = localStorage.username
       const message = e.target.children[0].value
       const roomId = this.props.roomId
            io.emit('new message', {roomId: roomId, message: message, user:name})
    }

  render(){
      return(
          <div class = "live">
                <h3 style = {{fontStyle:'italic'}}>Chat with your friends and react to the live!</h3>
                <form onSubmit = {this.sendMessage}>
                <input id = "message" type = "text" placeholder = "Message" onKeyDown = {this.props.feedback}></input>
                <button>Send</button>
                </form>
                <div id = "output"></div>
          </div>
      )
  }
}
)

//{this.props.comment.length > 0 ? this.props.displayComments() : null}
