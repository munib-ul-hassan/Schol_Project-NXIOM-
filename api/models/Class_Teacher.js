const mongoose = require("mongoose");

const Class_Teacher = mongoose.Schema({
  Teacher: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
  ],
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
module.exports = mongoose.model("ClassTeacher", Class_Teacher);
