import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import SongList from './SongList'
const mapStateToProps = state =>{
    return{
        songIds:state.songIds,
        userId: state.userId,
        username: state.username,
        login:state.login,
        liveMode: state.liveMode,
        roomId: state.roomId
    }
}

const mapDispatchToProps = {
    loginStatus: (status) => ({type: 'LOGIN', login:status})
}

export default connect (mapStateToProps, mapDispatchToProps)(class Main extends React.Component{
    handleSubmit = (e) =>{
        e.preventDefault()
        let query = (e.target.children[0].value).toLowerCase()
        console.log(query)
        const URL =`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCQHthJbbEt6osR39NsST13g&q=${query}&key=AIzaSyBlG_6DX-JMovaElRRI4KqXl_k0KAyHH_0`
        fetch(URL)
        .then((res) => res.json())
        .then(songData => {
            let songIds = songData.items.map(song => song.id.videoId)
            songIds = songIds.filter(id => id !== undefined)
            //pass videoIds to parent for <SongList>
             this.props.songList(songIds)
        }) 
    }

    logout = () => {
      this.props.loginStatus(false)
      localStorage.clear()
      console.log(this.props.login)
    }

 render(){
     return(
         <div >
             <span style = {{fontSize:'50px', fontStyle: 'bold'}}>Welcome {localStorage.username}</span>
             <Link to= '/singer' style = {{textDecoration: 'none', marginLeft:'70%', marginTop:'2%', position:'absolute'}}>Logout</Link>
             {this.props.liveMode == true? <h3>You are now in livemode, your room number is {this.props.roomId}, invite your friends to join the room!</h3> : null}
             <form onSubmit = {this.handleSubmit} style = {{marginLeft:'30%', marginTop:"5%"}}>
                 <input type = "text" placeholder = "Your next song is..." style = {{width:'450px',fontSize:'25px'}}/>
                 <button type = "submit" style = {{fontSize:'25px',borderRadius:'5px'}}>Go</button> 
             </form>
             {this.props.songIds.length > 0? <SongList songIds={this.props.songIds} />:null}
         </div>
     )
 }
}
)
// https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCwTRjvjVge51X-ILJ4i22ew&q=shallow&key=AIzaSyBlG_6DX-JMovaElRRI4KqXl_k0KAyHH_0
/*
theKaraokeChannel: TheKARAOKEChannel 
KaraFun: UCbqcG1rdt9LMwOJN4PyGTKg
KaraokeonVevo: UCQHthJbbEt6osR39NsST13g
*/