//NOT IN USE

const serverURL = 'http://localhost:3000'


export fetchSongs = ()=>{
    return (dispatch) => {
        dispatch({ type: 'SONGS_REQUEST' });
        return fetch(`${serverURL}/users/1/recorded-songs`)
          .then(response => response.json())
          .then(mySongs => dispatch({ type: 'USER_SONGS', action.mySongs }));
      };
}

