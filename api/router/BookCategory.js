const express = require("express");
const app = express();
var mongodb = require("mongodb");
const Mongoose = require("mongoose");
const router = express.Router();
const bookCategory = require("../model/bookCategory");
Mongoose.model("bookCategory");

router.post("/", async (req, res) => {
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

router.put("/", (req, res) => {
  bookCategory.updateOne({ _id: req.query.id }, req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data updated" });
  });
});
router.delete("/", (req, res) => {
  bookCategory.deleteOne({ _id: req.query.id }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data deleted Successfully" });
  });
});
router.get("/", (req, res) => {
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

module.exports = router;
