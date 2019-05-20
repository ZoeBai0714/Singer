/*
  1. npm install redux react-redux

  2. index.js is the root where we render the App
     import {createStore} from 'redux';
     import {Provider} from 'react-redux'
     import mySongsReducer from './Reducers/mySongsReducer'


     const store = createStore(mySongsReducer,
                               window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() )

     ReactDOM.render(<Provider store = {store}>
                        <App/>
                     </Provider> , document.getElementById('root'));

  3. in src folder, create a Reducer folder, and create mySongsReducer file  
  
  4. mySongsReducer.js

     initState = {
         mySongs:[]
     }
 
     const mySongsReducer = (state = initState, action) =>{
         return state
     }

     export default MySongsReducer
  
  5. connect our component(the state we want to change) to the store
      mySongs.js
      import {connect} from 'react-redux'


      const mapStateToProps = (state) =>{
            return{
                mySongs:state.mySongs
            }
      }
      export default connect(mapStateToProps)(MySongs)
*/