const router = require("express").Router();
const postController = require("../controllers/postController");
const userController = require("../controllers/userController");
// const multer = require("multer");

// const { Storage } = require('@google-cloud/storage');
// const storage = new Storage({
//     projectId: process.env.GCLOUD_PROJECT_ID,
//     keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
// });

// const uploader = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
//   },
// });

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

// router.post("/api/upload", uploader.single("image"), async (req, res, next) => {
//   try {
//     if (!req.file) {
//       res.status(400).send("No file uploaded.");
//       return;
//     }
//     // This is where we'll upload our file to Cloud Storage
//   } catch (error) {
//     res.status(400).send(`Error, could not upload file: ${error}`);
//     return;
//   }
// });

//GENERATE PDF ROUTE
// app.post('/create-pdf', (req, res) => {
//   pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
//       if(err) {
//           res.send(Promise.reject());
//       }

//       res.send(Promise.resolve());
//   });
// });

// app.get('/fetch-pdf', (req, res) => {
//   res.sendFile(`${__dirname}/result.pdf`)
// })

module.exports = router;
