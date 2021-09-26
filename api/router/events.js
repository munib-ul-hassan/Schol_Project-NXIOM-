const express = require("express");
const app = express();
var mongodb = require("mongodb");
const Mongoose = require("mongoose");
const router = express.Router();
const event = require("../model/events");
Mongoose.model("event");

router.post("/", async (req, res) => {
  const eventData = new event(req.body);

  eventData
    .save(req.body)
    .then((item) => {
      res.status(200).send({ message: "event Saved in to Database" });
    })
    .catch((err) => {
      res
        .status(400)
        .send("unable to save in database", { message: err.message });
    });
});

router.put("/", (req, res) => {
  event.updateOne({ _id: req.query.id }, req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data updated" });
  });
});
router.delete("/", (req, res) => {
  event.deleteOne({ _id: req.query.id }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data deleted Successfully" });
  });
});
router.get("/", (req, res) => {
  var { page, limit, skippedItems } = req.query;

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

module.exports = router;
