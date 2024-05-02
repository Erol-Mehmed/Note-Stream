const router = require('express').Router();

const notesController = require('./controllers/notesController');

router.use('/notes', notesController);

module.exports = router;
