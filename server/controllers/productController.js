const {
  models: { Product },
} = require("../db");

const catchAsync = (fn) => {
  return (req, res, next) => fn(req, res, next).catch(next);
};

// @desc: get all products
// @route: GET /api/products
// @access: Public
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.findAll({
    attributes: ["id", "title", "imageUrl", "price"],
  });
  res.status(200).json({
    status: "success",
    results: products.length,
    products,
  });
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

// @desc: Edit exit product
// @route: PUT /api/products/:id
// @access: Private and only allow admin
exports.editProduct = catchAsync(async (req, res, next) => {
  // find the product by id
  const existedProduct = await Product.findByPk(req.params.id);
  if (!existedProduct) {
    const error = new Error("This is product is not existed anymore");
    error.status = 400;
    throw error;
  }

  // update product
  // 1. check if admin try to update title, imageUrl, price
  // 2. make sure the data is valid
  // 3. update product
  if (req.body.title.length === 0) {
    const error = new Error("Title of Product is required");
    error.status = 400;
    throw error;
  }

  if (req.body.imageUrl.length === 0) {
    const error = new Error("ImageUrl of Product is required");
    error.status = 400;
    throw error;
  }

  if (req.body.price < 0) {
    const error = new Error(
      "Price of Product is required and must be greater than 0."
    );
    error.status = 400;
    throw error;
  }

  const [count, updatedProduct] = await Product.update(req.body, {
    where: {
      id: req.params.id,
    },
    validate: true,
    returning: true,
  });

  res.status(200).json({
    status: "success",
    updatedCount: count,
    product: updatedProduct[0],
  });

  // send product back
});

// @desc: Delete exist product
// @route: DELETE /api/products/:di
// @access: Private and only allow admin
exports.deleteProduct = catchAsync(async (req, res, next) => {
  await Product.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(204).json({
    status: "success",
  });
});
