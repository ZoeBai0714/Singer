import React from 'react';


export default class SongList extends React.Component{

    render(){
        return(
            <div>
                {this.props.songIds.map(id => <iframe style = {{width: "500px", height: "500px"}} src = {`https://www.youtube.com/embed/${id}`}></iframe>)}
            </div>
        )
    }
} 