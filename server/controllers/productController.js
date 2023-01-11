const {
  models: { Product },
} = require("../db");

const catchAsync = (fn) => {
  return (req, res, next) => fn(req, res, next).catch(next);
};

exports.getAllProducts = catchAsync(async (req, res, next) => {
  console.log("Im working");
  const products = await Product.findAll({
    // explicitly select only the id and username fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ["title", "imageUrl", "price"],
  });
  res.json(products);
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByPk(req.params.id);
  res.json(product);
});
