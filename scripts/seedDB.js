const mongoose = require("mongoose");
const routes = require("./routes");
const userSeed = require("./userSeed.json")
const postSeed = require("./postSeed.json")

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/aidexchange"
);

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " User records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

db.Post
  .remove({})
  .then(() => db.Post.collection.insertMany(postSeed))
  .then(data => {
    console.log(data.result.n + " Post records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
