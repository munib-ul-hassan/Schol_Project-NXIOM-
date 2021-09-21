const mongoose = require("mongoose");

const event = mongoose.Schema({
  Title: String,
  image: String,
  type: String,
  startdate: String,
  enddate: String,
  audience: String,
  created_by: String,
  shownwebsite: Boolean,
  publish: Boolean,
  Branch: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
  ],
});
module.exports = mongoose.model("event", event);
