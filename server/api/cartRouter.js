const router = require('express').Router();
const cartController = require('../controllers/cartController');
const { protect } = require('../auth/authController');

router.get('/', protect, cartController.getUserCart);
router.post('/', protect, cartController.addToCart);
router.put('/', cartController.editQuantity);
router.delete('/', cartController.deleteItem);

module.exports = router;
