const express = require("express");
const app = express();
var mongodb = require("mongodb");
const Mongoose = require("mongoose");
const routes = express.Router();
const Section = require("../models/Section_Schema");
Mongoose.model("Section");

routes.post("/Section", (req, res) => {
  const SectionData = new Section(req.body);
  SectionData.save(req.body)
    .then((item) => {
      res.status(200).send({ message: "Section Saved in to Database" });
    })
    .catch((err) => {
      res.status(400).send("unable to save in database");
    });
});

routes.put("/Section", (req, res) => {
  Section.updateOne({ _id: req.query.id }, req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data updated" });
  });
});
routes.delete("/Section", (req, res) => {
  Section.deleteOne({ _id: req.query.id }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data deleted Successfully" });
  });
});
routes.get("/Section", (req, res) => {
  var { page, limit, skippedItems } = req.query;
  skippedItems = (page - 1) * limit;

  Section.find()
    .limit(limit)
    .skip(skippedItems)
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      res.status(400).send("Data Not found");
    });
});
routes.get("/getSectionByBranch", (req, res) => {
  Section.find({ Branch: req.body.Branch }, (err, result) => {
    if (err) res.status(400).send("Data Not found");
    res.status(200).send(result);
  });
});
module.exports = routes;
