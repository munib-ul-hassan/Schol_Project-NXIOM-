const express = require("express");
const app = express();
var mongodb = require("mongodb");
const Mongoose = require("mongoose");
const routes = express.Router();
const ClassSchedule = require("../models/ClassSchedul");
Mongoose.model("ClassSchedule");
var dateformat = require("dateformat");

routes.post("/ClassSchedule", (req, res) => {
  const classschedule = new ClassSchedule(req.body);

  classschedule
    .save()
    .then((item) => {
      res.send("Subject Saved in to Database");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("unable to save in database");
    });
});

routes.put("/ClassSchedule", (req, res) => {
  ClassSchedule.updateOne({ _id: req.query.id }, req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data updated" });
  });
});
routes.delete("/ClassSchedule", (req, res) => {
  ClassSchedule.deleteOne({ _id: req.query.id }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data deleted Successfully" });
  });
});
routes.get("/ClassSchedule", (req, res) => {
  var { page, limit, skippedItems } = req.query;
  skippedItems = (page - 1) * limit;

  ClassSchedule.find(req.body)
    .limit(limit)
    .skip(skippedItems)

    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      res.status(400).send("Data Not found");
    });
});

routes.put("/ClassSchedule", (req, res) => {
  ClassSchedule.updateOne({ _id: req.query.id }, req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data updated" });
  });
});
routes.delete("/ClassSchedule", (req, res) => {
  ClassSchedule.deleteOne({ _id: req.query.id }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data deleted Successfully" });
  });
});
module.exports = routes;
