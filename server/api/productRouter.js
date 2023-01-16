const router = require("express").Router();
const productController = require("../controllers/productController");

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.addNewProduct);

router
  .route("/:id")
  .get(productController.getProduct)
  .put(productController.editProduct)
  .delete(productController.deleteProduct);

module.exports = router;
