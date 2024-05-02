const router = require('express').Router();

const notesServices = require('../services/notesServices');

router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await notesServices.createNote(title, content);
    
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
