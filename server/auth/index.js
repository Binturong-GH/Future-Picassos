const router = require('express').Router();

const {
  signup,
  login,
  protect,
  getMe,
  restrictTo,
  logout,
} = require('./authController');

router.post('/login', login);
router.post('/signup', signup);

router.get('/me', protect, getMe);

router.get('/logout', logout);

// example of how to use restrictTo to implement Authorization
router.get('/isAdmin', protect, restrictTo('admin'), (req, res) => {
  res.status(200).send('You are admin');
});

module.exports = router;
