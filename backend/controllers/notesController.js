const router = require('express').Router();
const notesServices = require('../services/notesServices');
const jwt = require('jsonwebtoken');

/**
 * Decodes the token and returns the payload
 * @param token
 * @returns {*}
 */
const tokenDecoding = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET).id;
}

router.post('/', async (req, res) => {
  try {
    console.log('test:', req.header('authorization'));
    
    const { title, content } = req.body;
    const note = await notesServices.createNote(tokenDecoding(req.header('authorization')), title.trim(), content.trim());
    
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

router.get('/', async (req, res) => {
  try {
    const notes = await notesServices.getNotes();
    
    res.status(200).json(notes);
  } catch(error) {
    res.status(500).json({ error: error.toString() });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    
    const note = await notesServices.updateNote(id, title.trim(), content.trim());
    
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await notesServices.deleteNote(id);
    
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
