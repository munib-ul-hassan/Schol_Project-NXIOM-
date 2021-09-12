const mongoose = require("mongoose");

const Section = mongoose.Schema({
  Name: String,
  Capacity: Number,
  Branch: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
  ],
});
module.exports = mongoose.model("Section", Section);
