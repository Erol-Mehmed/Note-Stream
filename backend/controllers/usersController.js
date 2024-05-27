const router = require('express').Router();
const usersService = require('../services/usersService');

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
    console.log(email, password);

  } catch(error) {
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;