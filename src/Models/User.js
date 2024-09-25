const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    mobile_num: {
      type: Number,
      required: true,
    },
    Nationality: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Occupation: {
      type: String,
      required: true,
    },
    DOB: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
