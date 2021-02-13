const router = require("express").Router();
const userController = require("../controllers/userController");

// Matches with "/api/user"
router.route("/user")
  .post(userController.create);

// Matches with "/api/user/:id"
// router
  // .route("/user/:id")
  // .get(userController.findById)
  // .put(userController.update)
  // .delete(userController.remove);

module.exports = router;
