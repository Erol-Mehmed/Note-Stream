const router = require('express').Router();

router.post('/notes', (req, res) => {
  console.log('req body:', req.body);
  res.status(200).send('Note created...');
});

module.exports = router;
