const { Schema, model } = require("mongoose");
const User = require('./User.model');
const Book = require('./Book.model')

const requestSchema = new Schema(
    {
      sender : {
        type: Schema.Types.ObjectId,
        // this is the name of the model that the _id refers to 
        ref: 'User'
      },
      reciever : {
        type: Schema.Types.ObjectId,
        // this is the name of the model that the _id refers to 
        ref: 'User'
      },
      book : {
        type: Schema.Types.ObjectId,
        // this is the name of the model that the _id refers to 
        ref: 'Book'
      },
      message: Array,
      proposal : {
        type: Schema.Types.ObjectId,
        // this is the name of the model that the _id refers to 
        ref: 'Book'
      },
      agreed: {
        type: Number,
        required: false,
        unique: false
    },
    },
    
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
  );
  
  const Request = model("Request", requestSchema);
  
  module.exports = Request;