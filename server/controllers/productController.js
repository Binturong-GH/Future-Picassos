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
