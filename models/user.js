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

const userSchema = new Schema({
  email: { type: String, required: true },
  displayName: { type: String, required: true },
  acctType: { type: String, default: "Individual", required: true },
  avatar: { type: String, default: "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" },
  description: String,
  location: { type: pointSchema, required: true, default: [-122.34962616663027, 47.630067400113475] },
  links: Array,
  userId: { type: String, required: true },
  createDate: { type: Date, default: Date.now }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
