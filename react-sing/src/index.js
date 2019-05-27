import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, compose, applyMiddleware } from 'redux'
import {Provider} from 'react-redux'
import ReduxThunk from 'redux-thunk';
import MySongsReducer from './Reducers/MySongsReducer'
const middleware = compose(
    applyMiddleware(ReduxThunk),
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const initState = {
    songIds: [],
    userId: "",
    username: "",//
    password:"",//
    login:false,
    comment: [], 
    mySongs: [],
    record: false,
    blobURL: "",
    blobString: "",
    roomId:"",
    usersInTheRoom:[],//
    liveMode: false,
    startedTimestamp:""
    //blobObj: {}
}

export const store = createStore(MySongsReducer, initState, middleware)

ReactDOM.render(<Provider store = {store}>
                   <App />
               </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
 