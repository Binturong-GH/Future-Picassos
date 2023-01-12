const router = require('express').Router();
const cartController = require('../controllers/cartController');

router.get('/cart', cartController.getUserCart);

module.exports = router;
