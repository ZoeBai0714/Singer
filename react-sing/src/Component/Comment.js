import React from 'react';
import {connect} from 'react-redux'
import {io} from './IO'
//const io = socketIO('http://10.185.2.248:3000/')

window.io = io

const mapStateToProps = state =>{
    return{
        username: state.username,
        roomId: state.roomId,
        liveMode: state.liveMode,
        comment: state.comment
    }
}

const mapDispatchToProps = {
    getUsername: (username) => ({type: 'USERNAME', username:username}),
    saveComment: (message)=>({type:'COMMENT', comment:message})
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
          io.on('broadcast message', message => {this.props.saveComment(message.message)
          this.props.getUsername(message.user)
        })
       
    }

    componentWillUnmount(){
        io.off('broadcast message', this.props.saveComment)
    }


    sendMessage = (e) =>{
       e.preventDefault()
       const name = localStorage.username
       const message = e.target.children[0].value
       const roomId = this.props.roomId
            io.emit('new message', {roomId: roomId, message: message, user:name})
    }

  render(){
      console.log(this.props.comment)
      return(
          <div class = "live">
                <h3 style = {{fontStyle:'italic'}}>Chat with your friends and react to the live!</h3>
                <form onSubmit = {this.sendMessage}>
                <input id = "message" type = "text" placeholder = "Message" onKeyDown = {this.props.feedback}></input>
                <button>Send</button>
                </form>
                <div id = "output">{this.props.comment.map(message => <p>{this.props.username}: {message}</p>)}</div>
          </div>
      )
  }
}
)

//{this.props.comment.length > 0 ? this.props.displayComments() : null}
