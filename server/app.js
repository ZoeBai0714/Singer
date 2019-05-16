const app = require('express')();
const http = require('http');
const cors = require('cors');
const server = http.createServer(app); 
const port = 3000;
const faker = require("faker");
const socketIO = require("socket.io");

app.use(cors());
server.listen(port, () => console.log(`Listening on port ${port}`));

//import models
const User = require('./models').User;
const RecordedSong = require('./models').RecordedSong

app.get('/users', (req, res) =>{
    User.findAll({
        //include associated model 
       include:[RecordedSong]
    }).then(users => res.json(users))
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
})


    // seed data
    // for (let i = 0; i < 500; i++){
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
