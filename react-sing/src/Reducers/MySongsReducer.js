
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
    } 
   return state
}

 
export default MySongsReducer