'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    profile: DataTypes.STRING,
    bio: DataTypes.STRING,
    recordedSong: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here. We don't need to import models on the top, sequelize uses models.xxx to specify
    User.hasMany(models.RecordedSong);
    User.hasMany(models.Comment);
  };
  return User;
}; 