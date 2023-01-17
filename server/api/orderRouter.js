const router = require("express").Router();
const orderController = require("../controllers/orderController");
const { protect } = require("../auth/authController");

router.post("/", protect, orderController.addNewOrder);

module.exports = router;
