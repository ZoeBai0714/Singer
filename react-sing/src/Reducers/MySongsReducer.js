
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
        
        case 'USERNAME':
            return {...state, username: action.username}
        break;
        
        case 'COMMENT':
            return {...state, comment: action.comment}
        break;    
    } 
   return state
}

 
export default MySongsReducer