require('dotenv').config();

const express  = require('express');
const cors = require('cors');

const PORT = process.env.PORT;
const routes = require('./routes');
const sequelize = require('./config/databaseConfig');

const app = express();

app.use(routes);
app.use(cors());

sequelize.authenticate()
.then(() => console.log('Database connected...'))
.catch(err => console.log('Error: ' + err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
