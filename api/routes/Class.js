const express = require("express");
const app = express();
var mongodb = require("mongodb");
const Mongoose = require("mongoose");
const routes = express.Router();
const Class = require("../models/Class_Schema");
Mongoose.model("Class");

routes.post("/Class", (req, res) => {
  const ClassData = new Class(req.body);
  ClassData.save(req.body)
    .then((item) => {
      res.status(200).send({ message: "Data Saved in to Database" });
    })
    .catch((err) => {
      res.status(400).send("unable to save in database");
    });
});

routes.put("/Class", (req, res) => {
  Class.updateOne({ _id: req.query.id }, req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data updated" });
  });
});
routes.delete("/Class", (req, res) => {
  Class.deleteOne({ _id: req.query.id }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data deleted Successfully" });
  });
});
routes.get("/Class", (req, res) => {
  var { page, limit, skippedItems } = req.query;
  skippedItems = (page - 1) * limit;

  Class.find()
    .limit(limit)
    .skip(skippedItems)

    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      res.status(400).send("Data Not found");
    });
});
routes.get("/getClassByBranch", (req, res) => {
  Class.find({ Branch: req.body.Branch }, (err, result) => {
    if (err) res.status(400).send("Data Not found");
    res.status(200).send(result);
  });
});
module.exports = routes;
