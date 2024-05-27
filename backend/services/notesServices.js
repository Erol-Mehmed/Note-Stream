const Note = require('../models/Notes');

const createNote = async (title, content) => {
  try {
    return await Note.create({title, content});
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getNotes = async () => {
  try {
    let notes = await Note.findAll();

    notes = notes.sort((a, b) => {
      return a.createdAt - b.createdAt;
    });
    
    return notes;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateNote = async (id, title, content) => {
  try {
    const note = await Note.findByPk(id);
    
    if (!note) {
      throw new Error('Note not found');
    }
    
    note.title = title;
    note.content = content;
    
    await note.save();
    
    return note;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteNote = async (id) => {
  try {
    const note = await Note.findByPk(id);
    
    if (!note) {
      throw new Error('Note not found');
    }
    
    await note.destroy();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote
};
