const router = require('express').Router();
const usersService = require('../services/usersService');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

router.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = await usersService.createUser(email, username, password);
    
    res.status(201).json(user);
  } catch(error) {
    res.status(500).json({ error: error.toString() });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usersService.getUser(email, password);
    
    if (!user) {
      res.status(200).json({ message: 'User not found!' });
    } else {
      const token = jwt.sign({ email, password }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true });
      res.status(200).json({ message: 'Login successful' }); 
    }
  } catch(error) {
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;