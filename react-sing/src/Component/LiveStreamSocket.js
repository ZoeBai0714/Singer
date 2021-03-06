import React from 'react'
import {connect} from 'react-redux'


const mapStateToProps = state =>{
    return{
        roomId: state.roomId,
        usersInTheRoom: state.usersInTheRoom,
        liveMode: state.liveMode
    }
}

const mapDispatchToProps = {
    // saveRoomId: (roomId) => ({type: 'ROOMID', roomId:roomId}),
    allUsers: (users) => ({type: 'USERSINTHEROOM', usersInTheRoom:users}),
    changeLiveMode: (mode) => ({type: 'LIVEMODE', liveMode: mode})
}

export default connect(mapStateToProps, mapDispatchToProps)(class LiveStreamSocket extends React.Component {
   

    // roomId = () => {
    //     const roomId = document.getElementById('room-id').value
    //     this.props.saveRoomId(roomId)

    // }

    joinRoom = () =>{
        // // change live mode to true and join room immediately so live chat and sing will work
        
        // // let roomId = document.getElementById('room-id').value
        // const roomId = this.props.roomId
        // if(roomId !=="" && this.props.liveMode == true){
        // // this.props.changeLiveMode(!this.props.liveMode)
        // io.emit('room', {roomId: roomId, user:localStorage.username})
        // }
        // // this.props.liveMode == false? alert(`You are joinning room ${roomId}`) : alert(`You leaving room ${roomId}`, io.disconnect(), io = null)

    }

    render(){
        // console.log(this.props.liveMode)
       return(
           <div class = "main-page"> 
            {/* {this.props.liveMode == true? this.joinRoom():null} */}
            {/* {this.props.liveMode == true? <h3>You are now in livemode, your room number is {this.props.roomId}, invite your friends to join the room!</h3> : null}   */}
            {/* Join Live Room No: <input onChange = {this.roomId} id = "room-id"/> */}
            {/* <button onClick = {this.joinRoom}>{this.props.liveMode == false? 'Go Live' : 'Stop live'}</button> */}
            {/* {this.props.liveMode == true?  <Comment reaction={this.props.reaction} username={this.props.username} comment={this.props.comment} /> : null}
            {this.props.liveMode == true?  <SoundEffect /> : null} */}
           </div>
       )
   }
}
)
