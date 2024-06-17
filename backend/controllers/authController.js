const router = require('express').Router();
const authServices = require('../services/authServices');

router.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    await authServices.createUser(email, username, password);

    const token = await authServices.getUser(email, password);
    res.cookie(process.env.AUTH_COOKIE_NAME, token);

    res.status(201).json({ message: 'User created successfully', token });
  } catch(error) {
    res.status(500).json({ error: error.toString() });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authServices.getUser(email, password);
    res.cookie(process.env.AUTH_COOKIE_NAME, token);

    res.status(200).json({ message: 'Login successful', token });
  } catch(error) {
      res.status(200).json({ error: 'Invalid email or password' });
  }
});

module.exports = router;