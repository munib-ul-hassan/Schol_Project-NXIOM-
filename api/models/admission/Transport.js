const mongoose = require("mongoose");
const Transport = mongoose.Schema({
  Transport_Route: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
  ],
  Vehicle_No: { type: Number },
});
module.exports = mongoose.model("transport", Transport);
