const router = require('express').Router();

const notesController = require('./controllers/notesController');
const usersController = require('./controllers/usersController');

router.use('/notes', notesController);
router.use('/users', usersController);

module.exports = router;
