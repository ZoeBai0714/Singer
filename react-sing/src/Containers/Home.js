import React from 'react'
import {connect} from 'react-redux'
import socketIO from 'socket.io-client';
import coverpage from '../assets/coverpage.mp4'
//const serverURL = 'http://localhost:3000'
const serverURL = 'http://10.185.7.76:3000'


const mapStateToProps = state =>{
    return {
              userId: state.userId,
              username: state.username,
              //password: state.password,
              login: state.login,
              loginFail: state.loginFail,
              textColor:state.textColor,
              liveMode: state.liveMode
           }
}

const mapDispatchToProps = {
    getUserId: (id) => ({type: "USERID", userId:id}),
    getUsername: (username) => ({type: 'USERNAME', username:username}),
    changeLiveMode: (mode) => ({type: 'LIVEMODE', liveMode: mode}),
    loginStatus: (status) => ({type: 'LOGIN', login:status}),
    loginFailStatus: (status) => ({type: 'LOGINFAIL', loginFail:status}),
    assignTextColor: (color) => ({type: 'TEXTCOLOR',textColor:color}),
    clearComment: ()=>({type:'CLEARCOMMENT', comment:[]})
}


 
export default connect (mapStateToProps, mapDispatchToProps) (class Home extends React.Component {
   
    login = (e) =>{
        console.log(localStorage)
        e.preventDefault()
        let username = e.target.children[0].children[1].value
        let password = e.target.children[1].children[1].value
        fetch(`${serverURL}/login`, {
                method: "POST",
                headers:{
                    'Content-Type': 'application/json',
                     Accept: "application/json"
                        },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
          .then(res => res.json())
          .then(data => {
              if(data.token){
                    localStorage.setItem('username', data.user.username)
                    localStorage.setItem('userid', data.user.id)
                    localStorage.setItem('token', data.token)
                    this.messageColor()
                    this.props.loginStatus(true)
                    this.props.changeLiveMode(false)
                    this.props.clearComment()
                    console.log(localStorage)
                }else{
                    console.log(data)
                    this.props.loginFailStatus(true)
                    console.log(this.props.loginFail)
                }
                
          })
    }


    signup = () =>{
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        fetch(`${serverURL}/users`, {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
                    },
            body: JSON.stringify({
                username: username,
                password: password
            })        
        })
    }

    messageColor = () =>{
        console.log('you reached me')
        const getRamdonInt = (min, max) =>{
           return Math.floor(Math.random() * (max - min + 1)) + min
        }
        const color = `rgb(${getRamdonInt(100,200)}, ${getRamdonInt(100,200)}, ${getRamdonInt(100,200)})`
        this.props.assignTextColor(color)
    }

    
    render(){
        console.log(this.props.textColor)
        return(
            <div >
               <div class = 'section'>
                    <div class = 'video-container'>
                        <video autoPlay loop muted>
                            <source src = {coverpage} type = "video/mp4"/>
                        </video> 
                    </div>
                      <h1 class = "glow">Singer</h1>
                      {this.props.loginFail == true? <div id = "login-fail">Incorrect login information, please try again</div> : null}
                      <form onSubmit = {this.login}>
                      <div class="input-container">
                        <i class="fa fa-user icon"></i>
                        <input class = "input-field" id = "username" type = "text" name = "username" placeholder = "username"/><br/>
                      </div>

                      <div class="input-container">
                        <i class="fa fa-key icon"></i>
                        <input id = "password" type="password" name = "password" placeholder = "password"/><br/><br/><br/>
                      </div>  
                        <button type = "submit" name = "login">Login</button>
                        <button name = "signup" onClick = {this.signup}>Sign up</button> 
                      </form>
                   
               </div>
            </div>
        )
    }
}
)