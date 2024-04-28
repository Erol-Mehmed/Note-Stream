const router = require('express').Router();

router.get('/', (req, res) => {
  console.log('works');
  res.send('Hello World!');
});

module.exports = router;
