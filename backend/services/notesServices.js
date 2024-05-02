const Note = require('../models/Notes');

const createNote = async (title, content) => {
  try {
    const note = await Note.create({ title, content });
    
    return note;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  createNote
};
