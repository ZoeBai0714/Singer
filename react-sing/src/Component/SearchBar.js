import React from 'react';
import {connect} from 'react-redux'
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
        let query = (e.target.children[1].value).toLowerCase()
        console.log(query)
        const URL =`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCQHthJbbEt6osR39NsST13g&q=${query}&key=AIzaSyBlG_6DX-JMovaElRRI4KqXl_k0KAyHH_0`
        fetch(URL)
        .then((res) => res.json())
        .then(songData => {
            console.log('you reached me')
            let songIds = songData.items.map(song => song.id.videoId)
            songIds = songIds.filter(id => id !== undefined)
            if(songIds.length == 0){
               this.noSongs()
            }else if(songIds.length > 0){
                const noSongs = document.querySelector('.no-songs')
                if(noSongs){
                    noSongs.remove()
                }
                 //pass videoIds to parent for <SongList>
                 this.props.songList(songIds)
            }
           
        }) 
    }

    noSongs = () =>{
         const h3 = document.createElement('h3')
         h3.className = "no-songs"
         const searchBar = document.getElementsByTagName('form')
         h3.innerHTML = "Sorry, we don't have this song yet"
         searchBar[0].appendChild(h3)
    }
 
    // logout = () => {
    //   this.props.loginStatus(false)
    //   localStorage.clear()
    //   console.log(this.props.login)
    // }

 render(){
     return(
         <div>
             {/* <Link to= '/singer' style = {{position:'abolute',textDecoration: 'none', marginLeft:'70%', marginTop:'2%', position:'absolute'}}>Logout</Link> */}
             <form onSubmit = {this.handleSubmit} style = {{marginLeft:'23%', marginTop:"5%"}}>
                 <button type = "submit" style = {{fontSize:'25px', opacity:'0.3', borderRadius:'5px', position:'absolute', marginLeft:'46%'}}>Go</button>
                 <input type = "text" placeholder = "Your next song is..." style = {{display:"flex",width:'655px',borderRadius:'5px', fontSize:'25px', opacity:'0.3'}}/>
             </form><br/>
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