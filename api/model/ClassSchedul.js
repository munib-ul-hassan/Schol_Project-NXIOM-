const mongoose = require("mongoose");

const ClassSchedule = mongoose.Schema({
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
  Day: String,
  Schedule: [
    {
      Subject: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subject",
        },
      ],
      Teacher: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Teacher",
        },
      ],
      StartingTime: String,
      EndingTime: String,
      ClassRoom: Number,
    },
  ],
});
module.exports = mongoose.model("ClassSchedule", ClassSchedule);
