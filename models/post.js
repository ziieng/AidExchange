const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pointSchema = new Schema({
  // reference: https://mongoosejs.com/docs/geojson.html
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const replySchema = new Schema(
  {
    userId: { type: String, required: true }, //pull in ID from user posting it
    message: String, // let them say hi I guess
    replyType: { type: String, required: true }, //give or take
    contents: Array, //if they're only requesting part
    status: { type: String, required: true, default: "pending" },
    location: { type: pointSchema, required: true },
    createDate: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
replySchema.virtual("replyBy", {
  ref: "User",
  localField: "userId",
  foreignField: "userId",
  justOne: true,
});

const postSchema = new Schema({
  userId: { type: String, required: true }, //pull in ID from user posting it
  title: { type: String, required: true },
  category: String,
  status: { type: String, required: true, default: "Open" },
  contents: Array,
  postType: { type: String, required: true }, //supply or request
  description: String, // do we want to add descriptions?
  location: { type: pointSchema, required: true },
  createDate: { type: Date, default: Date.now },
  replies: [replySchema]
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
  }
);
postSchema.virtual("postBy", {
  ref: "User",
  localField: "userId",
  foreignField: "userId",
  justOne: true,
});

postSchema.index({ location: "2dsphere" })

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
