const express = require("express");
const app = express();
var mongodb = require("mongodb");
const Mongoose = require("mongoose");
const routes = express.Router();
const ClassAssign = require("../models/Class_Assign");
Mongoose.model("ClassAssign");

routes.post("/ClassAssign", (req, res) => {
  const ClassAssignData = new ClassAssign(req.body);
  ClassAssignData.save(req.body)
    .then((item) => {
      res.send("ClassAssign Saved in to Database");
    })
    .catch((err) => {
      res.status(400).send("unable to save in database");
    });
});

routes.put("/ClassAssign", (req, res) => {
  ClassAssign.updateOne({ _id: req.query.id }, req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data updated" });
  });
});
routes.delete("/ClassAssign", (req, res) => {
  ClassAssign.deleteOne({ _id: req.query.id }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data deleted Successfully" });
  });
});
routes.get("/ClassAssign", (req, res) => {
  var { page, limit, skippedItems } = req.query;
  skippedItems = (page - 1) * limit;

  ClassAssign.find()
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
