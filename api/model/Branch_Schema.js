const mongoose = require("mongoose");

const branch = mongoose.Schema({
  B_Name: { type: String },
  I_Name: { type: String },
  B_Code: { type: String, unique: true },
  email: { type: String, unique: true },
  Mobile_No: { type: String, unique: true },
  Currency: { type: Number },
  Currency_Symbol: { type: String },
  city: { type: String },
  State: { type: String },
  Address: { type: String },
  System_Logo: { type: String },
  Text_Logo: { type: String },
  Printing_Logo: { type: String },
  Report_Logo: { type: String },
});

module.exports = mongoose.model("Branch", branch);
