const mongoose = require("mongoose");

const Class = mongoose.Schema({
  Name: String,
  Class_No: Number,
  Section: String,
  Branch: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
  ],
});
module.exports = mongoose.model("Class", Class);
