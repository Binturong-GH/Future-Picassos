const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/:userId/cart', userController.getUserCart);

module.exports = router;
