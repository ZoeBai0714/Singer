import React from 'react'
import {connect} from 'react-redux'
import socketIO from 'socket.io-client';
import { bindActionCreators } from '../../../../../Library/Caches/typescript/3.4.5/node_modules/redux';
const io = socketIO('localhost:3000/')
//const io = socketIO('http://10.185.6.107:3000/')
const mapStateToProps = state =>{
    return{
        roomId: state.roomId,
        usersInTheRoom: state.usersInTheRoom
    }
}

const mapDispatchToProps = {
    saveRoomId: (roomId) => ({type: 'ROOMID', roomId:roomId}),
    allUsers: (users) => ({type: 'USERSINTHEROOM', usersInTheRoom:users})
}

export default connect(mapStateToProps, mapDispatchToProps)(class LiveStreamSocket extends React.Component {
    componentDidMount(){
        io.on('usersInTheRoom', messageData => {
            console.log(messageData)
           //this.props.allUsers(users)
        })
    }


    joinRoom = () =>{
        const roomId = document.getElementById('room-id').value
        alert(`You are joinning room ${roomId}`)
        this.props.saveRoomId(roomId) // not in use
        if(io.connected){
            io.emit('room', {roomId:roomId, username: localStorage.username})
           }else{
            io.on('connect', () => {
               io.emit('room', {roomId:roomId, username: localStorage.username}) 
            })  
           }

    //   this.comment(roomId)          
    }

    // comment =(roomId)=>{
    //     // io.on('comment', messageData => {
    //     //     const commentArea = document.getElementById('output')
    //     //     return commentArea.innerHTML += '<p>' + messageData.username + ':' + messageData.message + '</p>'
    //     //   })
    // }
   
    render(){
        //console.log(this.props.usersInTheRoom)
       return(
           <div>
            <button onClick = {this.createRoom}>Allow Streaming</button>
            Join Live Room No: <input id = "room-id"/>
            <button onClick = {this.joinRoom}>Join</button>
           </div>
       )
   }
}
)