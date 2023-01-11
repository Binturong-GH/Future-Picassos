const router = require('express').Router();
const {
  models: { User },
} = require('../db');

const { signup, login } = require('./authController');

router.post('/login', login);
router.post('/signup', signup);

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
