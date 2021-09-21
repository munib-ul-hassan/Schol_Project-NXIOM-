const express = require("express");
const app = express();
var mongodb = require("mongodb");
const Mongoose = require("mongoose");
const routes = express.Router();
const bookRequest = require("../models/bookRequest");
Mongoose.model("bookRequest");
const bookList = require("../models/bookList");
Mongoose.model("bookList");

routes.post("/bookRequest", async (req, res) => {
  const bookRequestData = new bookRequest(req.body);
  bookRequestData.status = "pending";

  bookRequestData
    .save(req.body)
    .then((item) => {
      res.status(200).send({ message: "bookRequest Saved in to Database" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("unable to save in database");
    });
});

routes.put("/bookRequest", (req, res) => {
  bookRequest.updateOne({ _id: req.query.id }, req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data updated" });
  });
});
routes.delete("/bookRequest", (req, res) => {
  bookRequest.deleteOne({ _id: req.query.id }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data deleted Successfully" });
  });
});

routes.get("/bookRequest", async (req, res) => {
  var { page, limit, skippedItems, student_id } = req.query;
  skippedItems = (page - 1) * limit;

  bookRequest.find({ student_id }, (err, result) => {
    result.map((item) => {
      bookList.find({ _id: item.Book_id }, (err, data) => {
        var Value,
          i = 0;
        Value.push(data);
        i++;
        if (i == result.length) {
          res.json({ Value });
        }
      });
    });
    //console.log(result);
  });
  res.json(Value);
});

module.exports = routes;
