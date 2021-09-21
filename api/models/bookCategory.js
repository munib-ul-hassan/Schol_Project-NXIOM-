const mongoose = require("mongoose");
const bookCategory = mongoose.Schema({
  categoryName: String,
  Branch: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
  ],
});
module.exports = mongoose.model("bookCategory", bookCategory);
