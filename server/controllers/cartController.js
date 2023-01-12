const {
  models: { Product, User, Cart },
} = require('../db');

const catchAsync = (fn) => {
  return (req, res, next) => fn(req, res, next).catch(next);
};

//GET api/cart
exports.getUserCart = catchAsync(async (req, res, next) => {
  const cartItems = await Cart.findAll({
    where: { userId: req.userId },
  });
  res.send(cartItems);
});
