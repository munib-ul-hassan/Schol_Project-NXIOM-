const express = require("express");
const app = express();
var mongodb = require("mongodb");
const Mongoose = require("mongoose");
const router = express.Router();
const ClassSchedule = require("../model/ClassSchedul");
Mongoose.model("ClassSchedule");
// var dateformat = require("dateformat");

router.post("/", (req, res) => {
  const classschedule = new ClassSchedule(req.body);

  classschedule
    .save()
    .then((item) => {
      res.status(200).send({ message: "Subject Saved in to Database" });
    })
    .catch((err) => {
      res.status(400).send("unable to save in database");
    });
});

router.put("/", (req, res) => {
  ClassSchedule.updateOne({ _id: req.query.id }, req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data updated" });
  });
});

router.get("/", (req, res) => {
  var { page, limit, skippedItems } = req.query;
  skippedItems = (page - 1) * limit;

  ClassSchedule.find(req.body)
    .limit(limit)
    .skip(skippedItems)

    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      res.status(400).send("Data Not found");
    });
});

router.delete("/", (req, res) => {
  ClassSchedule.deleteOne({ _id: req.query.id }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data deleted Successfully" });
  });
});
module.exports = router;
