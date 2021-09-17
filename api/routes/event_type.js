const express = require("express");
const app = express();
var mongodb = require("mongodb");
const Mongoose = require("mongoose");
const routes = express.Router();
const eventtype = require("../models/event_type");
Mongoose.model("eventtype");

routes.post("/eventtype", async (req, res) => {
  const eventData = new eventtype(req.body);

  eventData
    .save(req.body)
    .then((item) => {
      res.send("event Saved in to Database");
    })
    .catch((err) => {
      res.status(400).send("unable to save in database");
    });
});

routes.put("/eventtype", (req, res) => {
  eventtype.updateOne({ _id: req.query.id }, req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data updated" });
  });
});
routes.delete("/eventtype", (req, res) => {
  eventtype.deleteOne({ _id: req.query.id }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data deleted Successfully" });
  });
});
routes.get("/eventtype", (req, res) => {
  var { page, limit, skippedItems } = req.query;
  console.log(page, limit);
  skippedItems = (page - 1) * limit;

  eventtype
    .find()
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
