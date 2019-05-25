import React from 'react'
import {connect} from 'react-redux'
import socketIO from 'socket.io-client';
import coverpage from '../assets/coverpage.mp4'
//const serverURL = 'http://localhost:3000'
const serverURL = 'http://10.124.179.242:3000'


const mapStateToProps = state =>{
    return {
              userId: state.userId,
              username: state.username,
              //password: state.password,
              login: state.login
           }
}

const mapDispatchToProps = {
    getUserId: (id) => ({type: "USERID", userId:id}),
    getUsername: (username) => ({type: 'USERNAME', username:username}),
    //getPassword: (password) => ({type: 'PASSWORD', password:password}),
    loginStatus: (status) => ({type: 'LOGIN', login:status})
}


 
export default connect (mapStateToProps, mapDispatchToProps) (class Home extends React.Component {
   
    login = (e) =>{
        e.preventDefault()
        console.log(e.target.children[1])
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
                localStorage.setItem('username', data.user.username)
                localStorage.setItem('userid', data.user.id)
                localStorage.setItem('token', data.token)
                this.props.loginStatus(true)
                console.log(localStorage)
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

    
    render(){
        return(
            <div >
               <div class = 'section'>
                    <div class = 'video-container'>
                        <video autoPlay loop muted>
                            <source src = {coverpage} type = "video/mp4"/>
                        </video> 
                    </div>
                      <h1 class = "glow">Singer</h1>
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