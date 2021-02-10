const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const replySchema = new Schema({
  userId: { type: String, required: true }, //pull in ID from user posting it
  message: String, // let them say hi I guess
  replyType: { type: String, required: true }, //give or take
  contents: Array, //if they're only requesting part
  location: {
    type: {
      type: String,
      enum: ['Point'], // 'location.type' must be 'Point'
    }
  },
  createDate: { type: Date, default: Date.now },
})

const postSchema = new Schema({
  userId: { type: String, required: true }, //pull in ID from user posting it
  title: { type: String, required: true },
  category: String,
  contents: Array,
  acctType: { type: String, required: true }, //individual, org, charity
  postType: { type: String, required: true }, //supply or request
  // description: String, // do we want to add descriptions?
  location: { // reference: https://mongoosejs.com/docs/geojson.html
    type: {
      type: String,
      enum: ['Point'], // 'location.type' must be 'Point'
    }
  },
  createDate: { type: Date, default: Date.now },
  replies: [replySchema]
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
