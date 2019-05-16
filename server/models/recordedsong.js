'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecordedSong = sequelize.define('RecordedSong', {
    name: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {});
  RecordedSong.associate = function(models) {
    // associations can be defined here
    RecordedSong.belongsTo(models.User)
  };
  return RecordedSong;
};