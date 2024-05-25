import {DataTypes, Model} from "sequelize";
import sequelize from "../config/databaseConfig";

class User extends Model {}

User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  }
);

module.exports = User;