import React from 'react';
import socketIO from 'socket.io-client';
 const io = socketIO('localhost:3000/')
//const io = socketIO('http://10.185.6.102:3000/')

export default class Comment extends React.Component{
  render(){
      return(
          <div>
              <form onSubmit = {this.props.reaction}>
              <input id = "handle" type = "text" placeholder = "Username"></input><br/>
              <input id = "message" type = "text" placeholder = "Message" onKeyDown = {this.props.feedback}></input>
              <button>Send</button>
              </form>
              <div id = "output"></div>
          </div>
      )
  }
}

//{this.props.comment.length > 0 ? this.props.displayComments() : null}
