const router = require("express").Router();
const postController = require("../controllers/postController")
const userController = require("../controllers/userController");
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

// Matches with "/api/addPost"
router.route("/addPost").post(postController.createPost);

// Mathces with "/api/post/:id"
router
  .route("/post/:id")
  .get(postController.findPostById)
  .put(postController.updatePost)
  .delete(postController.removePost);

module.exports = router;
