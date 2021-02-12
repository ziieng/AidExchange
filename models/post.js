const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pointSchema = new mongoose.Schema({
  // reference: https://mongoosejs.com/docs/geojson.html
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
})

const replySchema = new Schema({
  userId: { type: String, required: true }, //pull in ID from user posting it
  message: String, // let them say hi I guess
  replyType: { type: String, required: true }, //give or take
  contents: Array, //if they're only requesting part
  location: { type: pointSchema, required: true },
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
  location: { type: pointSchema, required: true },
  createDate: { type: Date, default: Date.now },
  replies: [replySchema]
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
