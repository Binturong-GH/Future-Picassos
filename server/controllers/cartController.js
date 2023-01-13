const {
  models: { Product, User, Cart },
} = require('../db');

const catchAsync = (fn) => {
  return (req, res, next) => fn(req, res, next).catch(next);
};

//GET api/cart
exports.getUserCart = catchAsync(async (req, res, next) => {
  const user = await window.localStorage.getItem('user');
  const cartItems = await Cart.findAll({
    where: { userId: user.id },
  });
  res.json(cartItems);
});

//POST api/cart
exports.addToCart = catchAsync(async (req, res, next) => {
  res.json(await Cart.create(req.body));
});

//PUT api/cart
exports.editQuantity = catchAsync(async (req, res, next) => {
  const [quant, item] = await Cart.update(req.body, {
    where: {
      userId: req.userId,
    },
  });
  res.json(item);
});

//DELETE api/cart
exports.deleteItem = catchAsync(async (req, res, next) => {
  const deletedItem = await Cart.destroy({
    where: {
      userId: req.userId,
      productId: req.body.productId,
    },
  });
  res.json(deletedItem);
});
