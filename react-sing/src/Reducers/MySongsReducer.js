
const MySongsReducer = (state, action) => {
    switch(action.type){
        case 'USER_SONGS':
            return {...state, mySongs: action.mySongs}
        break;    
        
        case 'CHANGE_RECORD_STATUS':
            return {...state, record: action.record}
        break;  
        
        case 'BLOBSTRING':
            return {...state, blobString: action.blob}
        break;  
         
        case 'BLOBURL':
            return {...state, blobURL: action.blobURL}
        break;  
         
        case 'BLOBOBJ':
            return {...state, blobObj: action.blobObj}
        break;
        
        case 'SONGIDS':
            return {...state, songIds: action.songIds}
        break;

        case 'USERID':
            return {...state, userId: action.userId}
        break;
        
        case 'USERNAME':
            return {...state, username: action.username}
        break;

        case 'PASSWORD':
            return {...state, password: action.password}
        break;

        case 'LOGIN':
            return {...state, login: action.login}
        break;

        case 'LOGINFAIL':
            return {...state, loginFail: action.loginFail}
        break;

        case 'LIVEMODE':
            return {...state, liveMode: action.liveMode}
        break;    

        case 'ROOMID':
            return {...state, roomId: action.roomId}
        break;

        case 'USERSINTHEROOM':
            return {...state, usersInTheRoom: action.usersInTheRoom}
        break;
        
        case 'COMMENT':            
            return {...state, comment: state.comment.concat(action.comment)}
        break;

        case 'CLEARCOMMENT':            
            return {...state, comment: []}
        break;
        
        case 'TIMESTAMP':
            return {...state, startedTimestamp: action.startedTimestamp}
        break;    
    } 
   return state
}

  
export default MySongsReducer