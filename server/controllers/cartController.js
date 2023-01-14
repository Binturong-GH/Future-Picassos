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
  // 1.check if the product already exist in user's cart
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
    // 2.1 if not, add this new product to user's cart
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
    // 2.2 if exist, update the quantity
    cartItem.quantity += req.body.quantity;
    await cartItem.save();
    res.status(200).json({
      cartItem: {
        product,
        quantity: req.body.quantity,
      },
    });
  }

  // 3. send new cart Item back to user
});

// @desc: edit quantity of item in user's cart
//@route: PUT api/cart
//@access: Private
exports.editQuantity = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const productId = req.body.productId;
  // const quantity = req.body.quantity;
  const cartEntry = await Cart.findAll({
    where: { userId: userId, productId: productId },
  });
  res.json(await cartEntry[0].update(req.body));
  //1. get the user id, product id, and updated quantity of product

  //2. edit that line in the db
  //3. return the edited cart item
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
