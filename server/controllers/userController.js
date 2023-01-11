const {
  models: { Product, User, Cart },
} = require('../db');

const catchAsync = (fn) => {
  return (req, res, next) => fn(req, res, next).catch(next);
};

//GET api/users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: ['id', 'name'],
  });
  res.json(users);
});

//GET api/users/:userId/cart
exports.getUserCart = catchAsync(async (req, res, next) => {
  const cartItems = await Cart.findAll({
    where: { userId: req.params.userId },
  });
  res.json(cartItems);
});
