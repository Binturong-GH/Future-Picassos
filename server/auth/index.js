const router = require('express').Router();

const { signup, login, protect, getMe } = require('./authController');

router.post('/login', login);
router.post('/signup', signup);

router.get('/me', protect, getMe);

module.exports = router;
