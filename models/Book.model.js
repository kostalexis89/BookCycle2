const { Schema, model } = require("mongoose");
const User = require('./User.model');


const bookSchema = new Schema(
  {
    isbn: {
    type: String,
    unique: false,
    required: false
  },
    title: {
      type: String,
      unique: false,
      required: true
    },
    description: {
      type: String,
      unique: false,
      required: false
    },
    author: {
      type: String,
      unique: false,
      required: false
    },
    image: {
      type: String,
      required: false,
      unique: false  
    },
    language: {
        type: String,
        required: false,
        unique: false
    },
    town: {
        type: String,
        required: true,
        unique: false
    },
    purpose: {
        type: String,
        required: true,
        unique: false
    },
    available : {
        type: Boolean,
        required: true,
        unique: false
    },
    user : {
      type: Schema.Types.ObjectId,
      // this is the name of the model that the _id refers to 
      ref: 'User'
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Book = model("Book", bookSchema);

module.exports = Book;