/*
1. setup socket in backend app.js
const io = socket(server);
const io = socketIO('http://localhost:3000/')
io.on('connection',(socket)=>{
    console.log('socket working'+ socket.id)   the id here is unique, so we can detect different window/computer
})


2. setup socket in frontend wherever you want to have the connection, eg: (react)App.js
import socketIO from 'socket.io-client'
const io = socketIO('http://localhost:3000/')

3. npm start
you should see log "socket working" xxxxx 

4. send message to the server
   create a form in any component, add event to onSubmit
   handleSubmit = () =>{
        e.preventDefault()
        io.emit('comment', {
        message: e.target.children[2].value,
        handle: e.target.children[0].value
        })
   }

5. go back to backend where we setup the socket, listen (on) to the message we just sent to the server, 
   and send it to frontend to all the connected sockets
const io = socketIO(server)
io.on('connection', socket =>{
    console.log('socket working' + socket.id)
    socket.on('comment', messageData => {
      //refer to all the sockets connected to the server  
      io.sockets.emit('comment', messageData)
    })
}) 


6. display on the frontend, put it in componentDidMount to make sure it is listening all the time
componentDidMount(){
  io.on('comment', messageData => {
      console.log('you reached me')
     const commentArea = document.getElementById('output')
     return commentArea.innerHTML += '<p>' + messageData.handle + ':' + messageData.message + '</p>'
    })
}


7. socket logic
 first emit the info from fromend where you need to send it to the backend
   io.emit('channel name', data)   ---->

 backend receive the data
   socket.on('channel name', data => console.log(data))
     socket.join(`room ${obj.roomId}`) this is where it filters users
 
 
 backend broadcast to frontend
        io.sockets.in(`room ${obj.roomId}`).emit('new channel name', data)
      
 frontend all clients receive the data
    io.on('new channel name', data => {  if(this.props.roomId == messageData.room) console.log(data)/ do something with the data})     
*/