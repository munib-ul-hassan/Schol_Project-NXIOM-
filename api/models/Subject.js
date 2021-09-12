const mongoose = require("mongoose");

const Subject = mongoose.Schema({
  S_Name: String,
  S_code: String,
  S_Author: String,
  S_type: String,

  Branch: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
  ],
});
module.exports = mongoose.model("Subject", Subject);
