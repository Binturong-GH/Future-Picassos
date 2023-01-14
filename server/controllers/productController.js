const {
  models: { Product },
} = require("../db");

const catchAsync = (fn) => {
  return (req, res, next) => fn(req, res, next).catch(next);
};

exports.getAllProducts = catchAsync(async (req, res, next) => {
  console.log("Im working");
  const products = await Product.findAll();
  res.json(products);
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByPk(req.params.id);
  res.json(product);
});

// @desc: Create new product
// @route: POST /api/products
// @access: Private and only allow admin
exports.addNewProduct = catchAsync(async (req, res, next) => {
  const { title, imageUrl, description, price, artistName, age, countInStock } =
    req.body;

  // 1. check if required field is empty
  if (!title) {
    const error = new Error("Title of product is required.");
    error.status = 400;
    throw error;
  }
  if (!imageUrl) {
    const error = new Error("ImageUrl of product is required.");
    error.status = 400;
    throw error;
  }
  if (!price) {
    const error = new Error("Price of product is required.");
    error.status = 400;
    throw error;
  }

  // check if product with this title already exist
  const existedProdcut = await Product.findOne({
    where: {
      title,
    },
  });

  if (existedProdcut) {
    const error = new Error("Product with this title already existed.");
    error.status = 400;
    throw error;
  }

  // 2. save product to database
  const createdProduct = await Product.create({
    title,
    imageUrl,
    description,
    price,
    artistName,
    age,
    countInStock,
  });

  // 3. send created product back to client
  res.status(201).json({
    status: "sucess",
    product: createdProduct,
  });
});
