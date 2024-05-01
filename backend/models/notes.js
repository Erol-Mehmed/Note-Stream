const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/databaseConfig');

class Note extends Model {}

Note.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
    sequelize,
    modelName: 'Note',
    tableName: 'notes'
  }
);
