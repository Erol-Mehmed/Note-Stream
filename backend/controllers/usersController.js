const router = require('express').Router();

router.post('/', async (req, res) => {
  try {
    const { username, password } = req;
    
  } catch(error) {
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;