require ('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

sequelize.sync({ alter: true })
.then(() => {
  console.log('Database synced...');
});

module.exports = sequelize;
