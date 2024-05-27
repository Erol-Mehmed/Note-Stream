const router = require('express').Router();
const notesServices = require('../services/notesServices');

router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await notesServices.createNote(title.trim(), content.trim());
    
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
