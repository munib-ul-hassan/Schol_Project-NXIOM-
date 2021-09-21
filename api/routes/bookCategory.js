const express = require("express");
const app = express();
var mongodb = require("mongodb");
const Mongoose = require("mongoose");
const routes = express.Router();
const bookCategory = require("../models/bookCategory");
Mongoose.model("bookCategory");

routes.post("/bookCategory", async (req, res) => {
  const bookCategoryData = new bookCategory(req.body);

  bookCategoryData
    .save(req.body)
    .then((item) => {
      res.status(200).send({ message: "bookCategory Saved in to Database" });
    })
    .catch((err) => {
      res
        .status(400)
        .send("unable to save in database", { message: err.message });
    });
});

routes.put("/bookCategory", (req, res) => {
  bookCategory.updateOne({ _id: req.query.id }, req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data updated" });
  });
});
routes.delete("/bookCategory", (req, res) => {
  bookCategory.deleteOne({ _id: req.query.id }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data deleted Successfully" });
  });
});
routes.get("/bookCategory", (req, res) => {
  var { page, limit, skippedItems } = req.query;

  skippedItems = (page - 1) * limit;

  bookCategory
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
