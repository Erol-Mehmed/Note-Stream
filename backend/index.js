require('dotenv').config();

const express  = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT;
const routes = require('./routes');
const sequelize = require('./config/databaseConfig');
const Note = require('./models/notes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

sequelize.authenticate()
.then(() => console.log('Database connected...'))
.catch(err => console.log('Error: ' + err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
