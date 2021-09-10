const mongoose = require("mongoose");
const Parents = mongoose.Schema({
  Name: { type: String },
  Father_Name: { type: String },
  Mother_Name: { type: String },
  Occupation: { type: String },
  Income: { type: Number },
  Eduction: { type: String },
  Relation: { type: String },
  Mobile_No: { type: String },
  Email: { type: String },
  City: { type: String },
  State: { type: String },
  Address: { type: String },
  Branch: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
  ],
});
module.exports = mongoose.model("parent", Parents);
