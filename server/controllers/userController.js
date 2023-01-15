const {
  models: { Product, User, Cart },
} = require("../db");

const catchAsync = (fn) => {
  return (req, res, next) => fn(req, res, next).catch(next);
};

// @desc: Get all users
// @route: GET api/users
// @access: Private & only admins are allowed to access
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: ["id", "name", "email", "role"],
  });
  res.status(200).json({
    status: "success",
    results: users.length,
    users: users,
  });
});

//GET api/users/:id
exports.getSingleUser = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.params.id, {
    attributes: ["id", "name"],
  });
  res.json(user);
});

//GET api/users/:id/cart
//moving to cartController
// exports.getUserCart = catchAsync(async (req, res, next) => {
//   const cartItems = await Cart.findAll({
//     where: { userId: req.params.id },
//   });
//   res.send(cartItems);
// });
