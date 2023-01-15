const router = require("express").Router();
const userController = require("../controllers/userController");
const { protect, restrictTo } = require("../auth/authController");

router.get("/", protect, restrictTo("admin"), userController.getAllUsers);

router.get("/:id", userController.getSingleUser);

module.exports = router;
