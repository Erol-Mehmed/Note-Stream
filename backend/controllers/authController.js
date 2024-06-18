const router = require('express').Router();
const authServices = require('../services/authServices');
const jwt = require("jsonwebtoken");

router.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    await authServices.createUser(email, username, password);

    const token = await authServices.getUser(email, password);
    res.cookie(process.env.AUTH_COOKIE_NAME, token, { httpOnly: true });

    res.status(201).json({ message: 'User created successfully' });
  } catch(error) {
    res.status(200).json({ error: error.toString().split('Error: ')[1] });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authServices.getUser(email, password);
    res.cookie(process.env.AUTH_COOKIE_NAME, token, { httpOnly: true });

    res.status(200).json({ message: 'Login successful', token });
  } catch(error) {
      res.status(200).json({ error: 'Invalid email or password' });
  }
});

router.get('/check' , async (req, res) => {
  try {
    // The verify method throws error if the token is invalid
    jwt.verify(req.cookies[process.env.AUTH_COOKIE_NAME], process.env.JWT_SECRET);

    res.status(200).json({ isAuthenticated: true });
  } catch(error) {
    res.status(200).json({ isAuthenticated: false });
  }
});

router.post('/logout', async (req, res) => {
  res.clearCookie(process.env.AUTH_COOKIE_NAME);
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;