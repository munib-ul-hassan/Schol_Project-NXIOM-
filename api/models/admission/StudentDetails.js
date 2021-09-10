const mongoose = require("mongoose");
const Student = mongoose.Schema({
  F_Name: { type: String },
  L_Name: { type: String },
  gender: { type: String },
  B_group: { type: String },
  DOB: { type: Date },
  Mother_Tongue: { type: String },
  Religion: { type: String },
  Cast: { type: String },
  Mobile_No: { type: String },
  Email: { type: String },
  City: { type: String },
  State: { type: String },
  Present_Address: { type: String },
  Permanent_Address: { type: String },
  Profile_Picture: { type: String },

  Hostel_Name: { type: String },
  Room_Name: { type: String },
  Institute_Name: { type: String },
  Qualification: { type: String },
  Remarks: { type: String },
  academy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admission",
    },
  ],
  parents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "parent",
    },
  ],
  transports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "transport",
    },
  ],
});
module.exports = mongoose.model("student", Student);
