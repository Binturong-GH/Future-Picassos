const {
  models: { Product, User, Cart },
} = require('../db');

const catchAsync = (fn) => {
  return (req, res, next) => fn(req, res, next).catch(next);
};

//GET api/users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  console.log('hello, na!');
  const users = await User.findAll({
    attributes: ['id', 'name'],
  });
  console.dir(users);
  res.status(200).json(users);
});

//GET api/users/:id
exports.getSingleUser = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.params.id, {
    attributes: ['id', 'name'],
  });
  res.json(user);
});

//GET api/users/:id/cart
exports.getUserCart = catchAsync(async (req, res, next) => {
  const cartItems = await Cart.findAll({
    where: { userId: req.params.id },
  });
  res.send(cartItems);
});
