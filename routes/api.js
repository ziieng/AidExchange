const router = require("express").Router();
const { userController, postController } = require("../controllers");

// Matches with "/api/user"
router.route("/user").post(userController.create);

// Matches with "/api/user/:id"
router
  .route("/user/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

// Mathces with "/api/post"

router
  .route("/post")
  .get(postController.findAllPost)
  .post(postController.reservePost);

// Mathces with "/api/post/:id"
router
  .route("/post/:id")
  .get(postController.findPostById)
  .put(postController.updatePost)
  .delete(postController.removePost);

module.exports = router;
