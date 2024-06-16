const router = require('express').Router();

const notesController = require('./controllers/notesController');
const authController = require('./controllers/authController');

router.use('/notes', notesController);
router.use('/auth', authController);

module.exports = router;
