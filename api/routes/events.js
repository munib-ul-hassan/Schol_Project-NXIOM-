const express = require("express");
const app = express();
var mongodb = require("mongodb");
const Mongoose = require("mongoose");
const routes = express.Router();
const event = require("../models/event");
Mongoose.model("event");

routes.post("/event", async (req, res) => {
  const eventData = new event(req.body);

  eventData
    .save(req.body)
    .then((item) => {
      res.send("event Saved in to Database");
    })
    .catch((err) => {
      res.status(400).send("unable to save in database");
    });
});

routes.put("/event", (req, res) => {
  event.updateOne({ _id: req.query.id }, req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data updated" });
  });
});
routes.delete("/event", (req, res) => {
  event.deleteOne({ _id: req.query.id }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data deleted Successfully" });
  });
});
routes.get("/event", (req, res) => {
  var { page, limit, skippedItems } = req.query;
  console.log(page, limit);
  skippedItems = (page - 1) * limit;

  event
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
