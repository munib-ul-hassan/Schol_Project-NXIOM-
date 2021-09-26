const mongoose = require("mongoose");

const bookList = mongoose.Schema({
  Book_Title: String,
  Cover: String, //image
  Ediion: String,
  isbn: String,
  Department: String,
  Description: String,
  purchase_Date: String,
  price: Number,
  author: String,
  publlisher: String,

  Tota_stock: Number,
  issued_copies: Number,
  Book_categoy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bookCategory",
    },
  ],
  Branch: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
  ],
});
module.exports = mongoose.model("bookList", bookList);
