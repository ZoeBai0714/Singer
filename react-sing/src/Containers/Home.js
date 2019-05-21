import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
const serverURL = 'http://localhost:3000'


const mapStateToProps = state =>{
    return {
              username:state.username,
              password: state.password
           }
}

const mapDispatchToProps = {
    getUsername: (username) => ({type: 'USERNAME', username:username}),
    getPassword: (password) => ({type: 'PASSWORD', password:password})
}

export default connect (mapStateToProps, mapDispatchToProps) (class Home extends React.Component {
    login = (e) =>{
        e.preventDefault()
        const username = e.target.children[1].value
        const password = e.target.children[4].value
        this.props.getUsername(username) // not in use, comment out later?
        this.props.getPassword(password) // not in use, comment out later?
            fetch(`${serverURL}/login`, {
                method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                        },
                body: JSON.stringify({
                    username: 'Eduardo MacGyver Sr.',//username,
                    password: password
                })        
            })
    }

    
    render(){
        console.log(this.props.username)
        return(
            <div>
                <form onSubmit = {this.login}>
                    <label/>Username
                    <input type = "text" name = "username"/><br/>
                    <label/>Password
                    <input type="password" name = "password"/><br/>
                    <button type = "submit" name = "login">Login</button>
                    <button type = "submit" name = "signup">Sign up</button>
                </form>
            </div>
        )
    }
}
)