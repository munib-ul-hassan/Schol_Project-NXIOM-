const mongoose = require("mongoose");

const bookRequest = mongoose.Schema({
  Book_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bookList",
    },
  ],
  issue_date: String,
  dateOfExpiry: String,
  status: String,
  list: [],
  Student_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
    },
  ],
});
module.exports = mongoose.model("bookRequest", bookRequest);
