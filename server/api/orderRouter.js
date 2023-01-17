const router = require("express").Router();
const orderController = require("../controllers/orderController");

router.post("/", orderController.addNewOrder);

module.exports = router;
