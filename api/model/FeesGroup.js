const mongoose = require("mongoose");

const feesgroup = mongoose.Schema({
  Name: String,
  FeesType: [],
  Description: String,
  Branch: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
  ],
});
module.exports = mongoose.model("feesgroup", feesgroup);
