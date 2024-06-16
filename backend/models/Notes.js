const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/databaseConfig');

class Note extends Model {}

Note.init({
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING(10000),
    allowNull: false
  }
}, {
    sequelize,
    modelName: 'Note',
    tableName: 'notes'
  }
);

module.exports = Note;
