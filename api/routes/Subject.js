const express = require("express");
const app = express();
var mongodb = require("mongodb");
const Mongoose = require("mongoose");
const routes = express.Router();
const Subject = require("../models/Subject");
Mongoose.model("Subject");

routes.post("/Subject", (req, res) => {
  const SubjectData = new Subject(req.body);
  SubjectData.save(req.body)
    .then((item) => {
      res.status(200).send({ message: "Subject Saved in to Database" });
    })
    .catch((err) => {
      res.status(400).send("unable to save in database");
    });
});

routes.put("/Subject", (req, res) => {
  Subject.updateOne({ _id: req.query.id }, req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data updated" });
  });
});
routes.delete("/Subject", (req, res) => {
  Subject.deleteOne({ _id: req.query.id }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data deleted Successfully" });
  });
});
routes.get("/Subject", (req, res) => {
  var { page, limit, skippedItems } = req.query;
  skippedItems = (page - 1) * limit;

  Subject.find()
    .limit(limit)
    .skip(skippedItems)

    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      res.status(400).send("Data Not found");
    });
});

module.exports = routes;
