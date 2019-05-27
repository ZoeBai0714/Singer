import React from 'react';
import {connect} from 'react-redux'
import {io} from './IO'
//const serverURL = 'http://localhost:3000'
const serverURL = 'http://10.185.1.196:3000'

const mapStateToProps = state =>{
     return { 
         userId: state.userId,
         mySongs: state.mySongs,
         liveMode: state.liveMode,
         roomId: state.roomId,
         }
}
 
const mapDispatchToProps = {
    fetchSongs: (userSongs)=> ({type: 'USER_SONGS', mySongs:userSongs}),
    changeLiveMode: (mode) => ({type: 'LIVEMODE', liveMode: mode}),
    saveRoomId: (roomId) => ({type: 'ROOMID', roomId:roomId})
}
export default connect(mapStateToProps, mapDispatchToProps)(

   class MySongs extends React.Component {

        fetchUserId = () => {
            if(this.props.liveMode == true){
              alert(`You are now leaving live room ${this.props.roomId}`)  
              this.props.changeLiveMode(false)
            }
            const mySongs = document.getElementById('song-list')
            //1.scroll up/down the window
            if(mySongs.classList == ""){
                window.scrollBy(0, 150)
            }else{
                window.scrollBy(0,-150)
            }

            // //2.add classList to toggle and close liveMode
            // this.props.changeLiveMode(false)
            mySongs.classList.toggle('active')


            //3.fetch user recordings
            fetch(`${serverURL}/users/${localStorage.userid}/recorded-songs`) 
            .then(res => res.json())
                .then(userSongs =>{ 
                    this.props.fetchSongs(userSongs)
                }) 
        }


        toggleLive =() =>{
         const btnValue = document.getElementById('toggleLive').innerText 
         console.log(btnValue)
         var roomId
         if(btnValue == "Go Live"){
            roomId = prompt('Please enter a room number you would like to join:')
                if(roomId == null ){
                    alert('room number cannot be empty!')
                }else if(roomId !== null){
                    //1. Change liveMode to render live components
                    this.props.changeLiveMode(true)

                    //2. Join room
                    io.connect()
                    io.emit('room', {roomId: roomId, user:localStorage.username})

                    //3. Close mySongs
                    const mySongs = document.getElementById('song-list')
                    mySongs.className = ''
                    
                    //4. scroll window 
                    window.scrollBy(0, 150)

                    //5. Save roomId
                    this.props.saveRoomId(roomId)
                }
          }else if(btnValue == "Stop Live"){
            alert(`You are leaving live room ${this.props.roomId}`)
            this.props.changeLiveMode(false)
            this.props.saveRoomId("")
            roomId = null
            io.disconnect()
            // io = null
            console.log(localStorage.username + ' left the room')
         }            
            // if(this.props.liveMode == false){
            //     const roomId = prompt('Please enter a room number you would like to join:')
            //     if(roomId == ""){            
            //         alert('room number cannot be empty!')
            //         // this.props.changeLiveMode(false)
            //     }else{
            //         this.props.saveRoomId(roomId)
            //         this.props.changeLiveMode(true/*!this.props.liveMode*/)
            //         io.emit('room', {roomId: roomId, user:localStorage.username})
            //         const mySongs = document.getElementById('song-list')
            //         if(mySongs.className.includes('active')){
            //             mySongs.className = ''  
            //         } 

            //         // io.emit('room', {roomId: roomId, user:localStorage.username})
            //     }
            // }else if(this.props.liveMode == true){
            //     alert(`You are leaving live room ${this.props.roomId}`)
            //     console.log(`${localStorage.username} left the room`)
            //     this.props.changeLiveMode(false)
            // }
            


            // 1. close mysongs if open
            // const mySongs = document.getElementById('song-list')
            // mySongs.className = ''  

            // 2. scroll up/ down the window
            // if(this.props.liveMode == true){
            //     window.scrollBy(0, 150)
            // }else{
            //     window.scrollBy(0,-150)
            // }

          
        }
        
        render(){
            console.log(this.props.liveMode)
            return(
                <div class = "main-page">
                    <button class = 'half-round-btn left my-songs' onClick = {this.fetchUserId}>Songs</button>
                    <button id = "toggleLive" class = 'half-round-btn left go-live' onClick = {this.toggleLive}>{this.props.liveMode ==false? 'Go Live': 'Stop Live'}</button>
                </div>
            )
        }
   }
)

// export a named class

/*
   <ul>
                   {this.props.mySongs.map(song => 
                   <li>
                       <audio controls>
                           <source src = {`data:audio/webm;codecs=opus;base64,${song.blobURL}`}/>
                       </audio>
                    </li>)}
               </ul>
*/