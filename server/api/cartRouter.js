const router = require('express').Router();
const cartController = require('../controllers/cartController');

router.get('/', cartController.getUserCart);
router.post('/', cartController.addToCart);
router.put('/', cartController.editQuantity);
router.delete('/', cartController.deleteItem);

module.exports = router;
