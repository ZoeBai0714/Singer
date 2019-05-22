import React from 'react'
import {connect} from 'react-redux'
import socketIO from 'socket.io-client';
const io = socketIO('localhost:3000/')
const serverURL = 'http://localhost:3000'


const mapStateToProps = state =>{
    return {
              userId: state.userId,
              username: state.username,
              password: state.password,
              login: state.login
           }
}

const mapDispatchToProps = {
    getUserId: (id) => ({type: "USERID", userId:id}),
    getUsername: (username) => ({type: 'USERNAME', username:username}),
    getPassword: (password) => ({type: 'PASSWORD', password:password}),
    loginStatus: (status) => ({type: 'LOGIN', login:status})
}


 
export default connect (mapStateToProps, mapDispatchToProps) (class Home extends React.Component {
    componentDidMount(){
        io.on('login', user => {
            this.props.loginStatus(true)
            this.props.getUserId(user.id)
        })
     }


    login = (e) =>{
        e.preventDefault()
        let username = e.target.children[1].value
        let password = e.target.children[4].value
        this.props.getUsername(username) // not in use, comment out later?
        this.props.getPassword(password) // not in use, comment out later?
            fetch(`${serverURL}/login`, {
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
        console.log(this.props.userId)
        return(
            <div>
                <form onSubmit = {this.login}>
                    <label/>Username
                    <input id = "username" type = "text" name = "username"/><br/>
                    <label/>Password
                    <input id = "password" type="password" name = "password"/><br/>
                    <button type = "submit" name = "login">Login</button>
                </form>
                <button name = "signup" onClick = {this.signup}>Sign up</button> 
            </div>
        )
    }
}
)