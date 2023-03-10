const router = require('express').Router();
const cartController = require('../controllers/cartController');
const { protect } = require('../auth/authController');

router.get('/', protect, cartController.getUserCart);
router.post('/', protect, cartController.addToCart);
router.put('/', protect, cartController.editQuantity);
router.delete('/', protect, cartController.deleteItem);

module.exports = router;
