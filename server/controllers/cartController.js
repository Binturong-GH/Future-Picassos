const { default: axios } = require('axios');
const {
  models: { Product, User, Cart },
} = require('../db');

const catchAsync = (fn) => {
  return (req, res, next) => fn(req, res, next).catch(next);
};

//GET api/cart
exports.getUserCart = catchAsync(async (req, res, next) => {
  // 1. find all productId by  userId
  const cartItems = await Cart.findAll({
    where: { userId: req.user.id },
  });
  //cart items will be an array of objects: {userId, productId, quantity}
  // 2. get product detail by productId

  const cartDetails = await Promise.all(
    cartItems.map(async (cartObj) => {
      return {
        productInfo: await Product.findByPk(cartObj.productId),
        quantity: cartObj.quantity,
      };
    })
  );

  // 3. send response back to user {cartItem:[{}]}

  //audit what we need to include in cart page, do not need to include all data about each

  res.json({
    cartDetails: cartDetails,
    userId: req.user.id,
  });
});

// @desc: add new item to user's cart
// @route: POST api/cart
// @access: Private
exports.addToCart = catchAsync(async (req, res, next) => {
  const cartItem = await Cart.findOne({
    where: {
      userId: req.user.id,
      productId: req.body.productId,
    },
  });

  const product = await Product.findByPk(req.body.productId, {
    attributes: ['id', 'imageUrl', 'title', 'price'],
  });

  if (!cartItem) {
    const newCartItem = await Cart.create({
      userId: req.user.id,
      productId: req.body.productId,
      quantity: req.body.quantity,
    });

    res.status(201).json({
      cartItem: {
        product,
        quantity: req.body.quantity,
      },
    });
  } else {
    cartItem.quantity += req.body.quantity;
    await cartItem.save();
    res.status(200).json({
      cartItem: {
        product,
        quantity: req.body.quantity,
      },
    });
  }
});

// @desc: edit quantity of item in user's cart
//@route: PUT api/cart
//@access: Private
exports.editQuantity = catchAsync(async (req, res, next) => {
  const cartEntry = await Cart.findAll({
    where: { userId: req.user.id, productId: req.body.productId },
  });
  res.json(await cartEntry[0].update(req.body));
});

//DELETE api/cart
exports.deleteItem = catchAsync(async (req, res, next) => {
  const deletedItem = await Cart.destroy({
    where: { userId: req.user.id, productId: req.body.productId },
  });
  res.json(deletedItem);
});
