import React from 'react';


export default class SongList extends React.Component{

    render(){
        return(
            <div id = "search" >
                {this.props.songIds.map(id => <iframe style = {{width: "700px", height: "400px"}} src = {`https://www.youtube.com/embed/${id}`}></iframe>)}
            </div>
        )
    }
} 