const mongoose = require("mongoose");

const eventtype = mongoose.Schema({
  Name: String,
  icon: String,
  Branch: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
  ],
});
module.exports = mongoose.model("eventtype", eventtype);
