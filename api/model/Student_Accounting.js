const mongoose = require("mongoose");

const studentaccounting = mongoose.Schema({
  Branch: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
  ],
  Name: String,
  FeeCode: String,
  Description: String,
});

module.exports = mongoose.model("studentaccounting", studentaccounting);
