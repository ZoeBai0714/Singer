const app = require('express')();
const http = require('http');
const cors = require('cors');
const server = http.createServer(app); 
const port = 3000;
const faker = require("faker");
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const socketIO = require("socket.io");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

app.use(bodyParser.json({limit: '50mb'}))
app.use(cors());
server.listen(port, () => console.log(`Listening on port ${port}`));
  
//import models
const User = require('./models').User;
const RecordedSong = require('./models').RecordedSong
const Comment = require('./models').Comment

 
app.post ('/login', (req, res) => {
    //console.log(req.body)
    User.findOne({where: {username: req.body.username}})
    .then(user => {
        let hash = user.password_digest
        bcrypt.compare(req.body.password, hash, (err, result)=>{
           if (result == true){
             //assign token async and send back user login info to frontend to change login status
                jwt.sign({user:user}, 'secretkey', (err, token)=>{
                    res.json({user, token})
                })         
           }else if(result == false){
               res.json({result})
           } 
        })
    })
})

  
 
//Routes for data 
app.get('/users', (req, res) =>{
    User.findAll({
        //include associated model 
       include:[{
                model: RecordedSong
            },
            {
                model:Comment
            }]
   
    }).then(users => res.json(users))
})

app.post('/users', urlencodedParser, async (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash)=>{
      User.create({username: req.body.username, password_digest: hash })
    })
   
})
 
app.get('/users/:id', (req, res) =>{
  User.findByPk(req.params.id)
  .then(user => res.json(user))
})

// Each user's recordings
app.get('/users/:id/recorded-songs', (req, res) =>{
        User.findByPk(req.params.id)
        .then(user => {user.getRecordedSongs()
        .then(userSongs => res.json(userSongs))
        })
})

app.get('/recorded-songs', (req, res) =>{
    console.log("watup")
    RecordedSong.findAll({ include:[{model: User}]})
    .then(songs => res.json(songs))
})
 

app.post('/recorded-songs', urlencodedParser, async (req, res) => {
    //console.log(req.body)
    //get info from frontend fetch and create the recordedsong and association in db
    let user = await User.findByPk(1)
    let song = await RecordedSong.create({name: req.body.name, likes: req.body.likes, blobURL:req.body.blobURL })
    song.setUser(user.id)
})

//  User.findByPk(1)
//  .then(user => {
//      user.getRecordedSongs()
//      .then(songs => console.log(songs[1].dataValues.blobURL))})  COMMENT THIS OUT LATER!
 

app.get('/recorded-songs/:id', (req, res)=>{
    RecordedSong.findByPk(req.params.id)
    .then(song => res.json(song))
})

//setup socket

const rooms = {}
const io = socketIO(server)
io.on('connection', socket =>{
    console.log('socket working hi')
    /////////////////////////////Live Chat////////////////////////
    socket.on('room', data => {
       console.log(data)
       // if a room exist, put them in, if not create one and push the first user in
            if(rooms[data.roomId] == undefined){
                rooms[data.roomId] = {
                    id:data.roomId,
                    users:[data.user]
                }
            }else if(!rooms[data.roomId].users.includes(data.user)){
               rooms[data.roomId].users.push(data.user)
               console.log( rooms[data.roomId].users)
            }
       console.log(rooms)
       socket.join(data.roomId)
       io.sockets.in(data.roomId).emit('new user',`${data.user}`)
    })
    //// receive new message
    socket.on('new message', message => {
        console.log(message)
        io.sockets.in(message.roomId).emit('broadcast message', {message:message.message, user:message.user})
    })

   //////////////////////// Live Singing //////////////////////
    socket.on('audioBuffer', audioBuffer => {
        console.log(audioBuffer)
        io.sockets.in(audioBuffer.roomId).emit('new audioBuffer', audioBuffer.bufferData)
       //socket.broadcast.emit('audioBuffer', audioBuffer)
       //io.sockets
    })
   socket.on('abort',()=>{
       socket.broadcast.emit('abort')
   })

 /////////////////////////////Sound Effect////////////////////////
    socket.on('applause', applause => {
        console.log(applause)
        io.sockets.in(applause.roomId).emit('play applause', applause.sound)
    })

    socket.on('boo', boo => {
        console.log(boo)
        io.sockets.in(boo.roomId).emit('play boo', boo.sound)
    })
  
    socket.on('whistle', whistle =>{
        console.log(whistle)
        io.sockets.in(whistle.roomId).emit('play whistle', whistle.sound)
    })
})
  


    // seed data
    // for (let i = 0; i < 1; i++){
    //  User.create({
    //      username: 'Zoe',//faker.name.findName(),
    //      password: hashPassword('Zoe'),//faker.internet.password(),  call the hashPassword function and save the hashed string into db
    //      profile: faker.image.imageUrl(),
    //      bio: faker.lorem.sentence(),
    //      recordedSong: ""
    //  }).then(user => {
    //          user.createRecordedSong({
    //             name: faker.lorem.words(),
    //             likes: faker.random.number()
    //         });
    //          user.createComment({
    //             content: faker.lorem.paragraph(),
    //             date: faker.date.recent()
    //          }).then(() => console.log('data created'))
    //                  })
    // }
