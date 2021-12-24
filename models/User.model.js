const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
//User model: username, email, Town, picture, password
const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    town: {
      type: String,
      required: true
    },
    picture: {
      type: String,
      required: false
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
