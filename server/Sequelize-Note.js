/* 
 1.npm install --save sequelize-cli
 2.sequelize init
   this will create folders of model, migration and seeders as well as config for you

 3.change config.json
   "database": "sequelize_migrations"
   "dialect": "sqlite"
   
 4.sequelize model:create --name User --attributes username:string, password:string
   create all the models using above command line
   this will generate model and migration for you

 5.create association
   open up migration file, in the Many model(one to many). added foreign key:
   userId:{
        type: Sequelize.INTEGER
      },
   
   open up model files, add association:
   User.hasMany(models.RecordedSong);
   RecordedSong.belongsTo(models.User)
   
 6.sequelize db:migrate (sequelize db:migration:undo)
 
 7.create user (and its association) in app.js into db
   User.create({
    username:"zoe",
    password:"Zoe",
    profile:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfzAa3b-bFvMU1TbmJ8lfda7GkCr3xmKTDLSYZmx3vWEwFjFrO",
    bio:"I love singing",
    recordedSong:"not yet"
}).then(user => {
    // sequelize method
    user.createRecordedSong({
       name:"Say Something", 
       likes:100
    }).then(() => console.log('data created')) 
})

8. node app.js
   you should see log "data created" and the sqlite excution
   
9. log data to check tables and their association
   User.findAll({
    //include associated model 
   include:[RecordedSong]
}).then(users => console.log(users[0].RecordedSongs)) 

10. Node js backend talk to frontend data through fetch request
   the frontend fetch request(post) we send will be caught by backend post method
   
   FRONTEND:
   fetch(`${serverURL}/recorded-songs`, {
          method: "POST",
          headers:{
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            name:"test",
            likes: 0,
            blobURL: this.state.blobURL
          })
        }) 

    BACKEND:    
    app.post('/recorded-songs', urlencodedParser, (req, res) => {
    //res.send('you reached me')
    console.log(req)
    // continue here
}) 

important : make sure we install body-parser, and have this line of code: app.use(bodyParser.json())

11. create instance and attach association
  app.post('/recorded-songs', urlencodedParser, async (req, res) => {
    console.log(req.body)
    // get info from frontend fetch and create the recordedsong and association in db
    let user = await User.findByPk(1)
    let song = await RecordedSong.create({name: req.body.name, likes: req.body.likes, blobURL:req.body.blobURL })
    song.setUser(user.id)
})
*/