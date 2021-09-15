const mongoose = require("mongoose");
const Academydetails = mongoose.Schema({
  Academic_Year: { type: String },
  Branch: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
  ],
  Class: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
  ],
  Section: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
});
module.exports = mongoose.model("Academydetails", Academydetails);
