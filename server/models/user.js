'use strict';
const bcrypt = require('bcrypt')


module.exports = (sequelize, DataTypes) => {
  
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password_digest: DataTypes.STRING,
    profile: DataTypes.STRING,
    bio: DataTypes.STRING,
    recordedSong: DataTypes.STRING
  // }, {
  //       instanceMethods: {
  //             generateHash(password) {
  //                 return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  //             },
  //             validPassword(password) {
  //                 return bcrypt.compareSync(password, this.password);
  //             }
  //       }
     });
  User.associate = function(models) {
    // associations can be defined here. We don't need to import models on the top, sequelize uses models.xxx to specify
    User.hasMany(models.RecordedSong);
    User.hasMany(models.Comment);
  };
  return User;
};  