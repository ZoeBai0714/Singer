import React from 'react';
import {connect} from 'react-redux'
import { store } from '../index.js';
const serverURL = 'http://localhost:3000'

const mapStateToProps = state =>{
     return { mySongs: state.mySongs }
}
 
const mapDispatchToProps = {
           fetchSongs: () => {
            return dispatch =>{    
                fetch(`${serverURL}/users/1/recorded-songs`)
                .then(res => res.json())
                .then(userSongs =>{ 
                    dispatch ({type: 'USER_SONGS', mySongs:userSongs})
                })
        }
    }
 
}
export default connect(mapStateToProps, mapDispatchToProps)(

   class MySongs extends React.Component {

        componentDidMount(){
            this.props.fetchSongs()
        }

        render(){
            return(
                <div>
                    <h3>My songs</h3>
                    <ul>
                        {this.props.mySongs.map(song => 
                        <li>
                            <audio controls>
                                <source src = {`data:audio/webm;codecs=opus;base64,${song.blobURL}`}/>
                            </audio>
                            </li>)}
                    </ul>
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