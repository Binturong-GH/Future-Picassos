const router = require("express").Router();
const userController = require("../controllers/userController");
const { protect, restrictTo } = require("../auth/authController");

router.get("/", protect, restrictTo("admin"), userController.getAllUsers);

router
  .route("/:id")
  .get(userController.getSingleUser)
  .delete(protect, restrictTo("admin"), userController.deleteUser);

module.exports = router;
