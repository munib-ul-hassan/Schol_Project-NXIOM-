const express = require("express");
const app = express();
var mongodb = require("mongodb");
const Mongoose = require("mongoose");
const routes = express.Router();
const ClassTeacher = require("../models/Class_Teacher");
Mongoose.model("ClassTeacher");

routes.post("/ClassTeacher", (req, res) => {
  const ClassData = new ClassTeacher(req.body);
  ClassData.save(req.body)
    .then((item) => {
      res.send("Data Saved in to Database");
    })
    .catch((err) => {
      res.status(400).send("unable to save in database");
    });
});

routes.put("/ClassTeacher", (req, res) => {
  ClassTeacher.updateOne({ _id: req.query.id }, req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data updated" });
  });
});
routes.delete("/ClassTeacher", (req, res) => {
  ClassTeacher.deleteOne({ _id: req.query.id }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data deleted Successfully" });
  });
});
routes.get("/ClassTeacher", (req, res) => {
  var { page, limit, skippedItems } = req.query;
  skippedItems = (page - 1) * limit;

  ClassTeacher.find()
    .limit(limit)
    .skip(skippedItems)
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      res.status(400).send("Data Not found");
    });
});

module.exports = routes;
