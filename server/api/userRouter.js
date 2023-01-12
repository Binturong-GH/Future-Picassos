const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getSingleUser);

module.exports = router;
