import React from 'react';
import {connect} from 'react-redux'
import { store } from '../index.js';
//const serverURL = 'http://localhost:3000'
const serverURL = 'http://10.185.2.248:3000'

const mapStateToProps = state =>{
     return { 
         userId: state.userId,
         mySongs: state.mySongs
         }
}
 
const mapDispatchToProps = {
           fetchSongs: (id) => {
            return dispatch =>{    
                fetch(`${serverURL}/users/${localStorage.userid}/recorded-songs`)
                .then(res => res.json())
                .then(userSongs =>{ 
                    dispatch ({type: 'USER_SONGS', mySongs:userSongs})
                })
        }
    }
 
}
export default connect(mapStateToProps, mapDispatchToProps)(

   class MySongs extends React.Component {

        fetchUserId = () => {
            this.props.fetchSongs(this.props.userId)
        }

        render(){
            return(
                <div>
                    <button style = {{fontSize:'20px'}} onClick = {this.fetchUserId}>My songs</button>
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