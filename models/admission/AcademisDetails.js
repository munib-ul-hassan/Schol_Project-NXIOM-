const mongoose = require("mongoose");
const Academic = mongoose.Schema({
  Academic_Year: { type: Number },
  Register_No: { type: Number },
  Roll: { type: Number },
  Admission_Date: { type: Date },
  Branch: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
  ],
  Class: { type: Number },
  Section: { type: String },
  Department: { type: String },
});
module.exports = mongoose.model("admission", Academic);
