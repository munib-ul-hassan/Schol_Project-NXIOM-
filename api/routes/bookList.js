const express = require("express");
const app = express();
var mongodb = require("mongodb");
const Mongoose = require("mongoose");
const routes = express.Router();
const bookList = require("../models/bookList");
Mongoose.model("bookList");

routes.post("/bookList", async (req, res) => {
  const bookListData = new bookList(req.body);

  bookListData
    .save(req.body)
    .then((item) => {
      res.status(200).send({ message: "bookList Saved in to Database" });
    })
    .catch((err) => {
      res
        .status(400)
        .send("unable to save in database", { message: err.message });
    });
});

routes.put("/bookList", (req, res) => {
  bookList.updateOne({ _id: req.query.id }, req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data updated" });
  });
});
routes.delete("/bookList", (req, res) => {
  bookList.deleteOne({ _id: req.query.id }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data deleted Successfully" });
  });
});
routes.get("/bookList", (req, res) => {
  var { page, limit, skippedItems } = req.query;
  skippedItems = (page - 1) * limit;

  bookList
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
