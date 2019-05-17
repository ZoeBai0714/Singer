import React from 'react';


export default class Main extends React.Component{
    handleSubmit = (e) =>{
        e.preventDefault()
        let query = (e.target.children[0].value).toLowerCase()
        const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCQHthJbbEt6osR39NsST13g&q=${query}&key=AIzaSyBlG_6DX-JMovaElRRI4KqXl_k0KAyHH_0`
        fetch(URL)
        .then((res) => res.json())
        .then(songData => {
            let songIds = songData.items.map(song => song.id.videoId)
            songIds = songIds.filter(id => id !== undefined)
            //pass videoIds to parent for <SongList>
             this.props.songList(songIds)
        }) 
    }
     
 render(){
     return(
         <div>
             <form onSubmit = {this.handleSubmit}>
                 <input type = "text" placeholder = "Your next song is..."/>
                 <input type = "submit"/>
             </form>
         </div>
     )
 }
}

// https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCwTRjvjVge51X-ILJ4i22ew&q=shallow&key=AIzaSyBlG_6DX-JMovaElRRI4KqXl_k0KAyHH_0
/*
theKaraokeChannel: TheKARAOKEChannel 
KaraFun: UCbqcG1rdt9LMwOJN4PyGTKg
KaraokeonVevo: UCQHthJbbEt6osR39NsST13g
*/