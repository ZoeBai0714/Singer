const app = require('express')();
const http = require('http');
const cors = require('cors');
const server = http.createServer(app); 
const port = 3000;
const faker = require("faker");
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const socketIO = require("socket.io");
app.use(bodyParser.json({limit: '50mb'}))
app.use(cors());
server.listen(port, () => console.log(`Listening on port ${port}`));
  
//import models
const User = require('./models').User;
const RecordedSong = require('./models').RecordedSong
const Comment = require('./models').Comment

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
const io = socketIO(server)
io.on('connection', socket =>{
    console.log('socket working')
    socket.on('comment', messageData => {
      //refer to all the sockets connected to the server  
      io.sockets.emit('comment', messageData)
      console.log(messageData)
    })

//     // real-time audio sending
    socket.on('audioBuffer', audioBuffer => {
       socket.broadcast.emit('audioBuffer', audioBuffer)
       //io.sockets
       console.log(audioBuffer) 
    })
   socket.on('abort',()=>{
       socket.broadcast.emit('abort')
   })
   
})



    // seed data
    // for (let i = 0; i < 100; i++){
    //  User.create({
    //      username: faker.name.findName(),
    //      password: faker.internet.password(),
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
