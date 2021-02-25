const router = require("express").Router();
const postController = require("../controllers/postController");
const userController = require("../controllers/userController");

// Matches with "/api/user"
router.route("/user")
  .post(userController.create);

// Matches with "/api/user/:id"
router.route("/user/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

// Matches with "/api/post"
router.route("/post")
  .post(postController.searchNear)

// Matches with "/api/post/:id"
router.route("/post/:id")
  .get(postController.findPostById)
  .put(postController.updatePost)
  .delete(postController.removePost);

router.route("/search/post?:uid")
  .get(postController.findPostByUser);

router.route("/search/reply?:uid")
  .get(postController.findReplyByUser);

// Matches with "/api/addPost"
router.route("/addPost")
  .post(postController.createPost);

// Mathces with "/api/NewListing/:id"
router.route("/NewListing/:id")
  .get(postController.findPostById)
  .put(postController.updatePost)
  .delete(postController.removePost);


module.exports = router;
