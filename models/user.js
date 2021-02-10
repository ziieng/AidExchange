const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  displayName: { type: String, required: true },
  acctType: { type: String, required: true },
  description: String,
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
    }
  },
  links: Array,
  createDate: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

module.exports = User;