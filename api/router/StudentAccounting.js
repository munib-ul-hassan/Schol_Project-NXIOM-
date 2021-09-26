const express = require("express");
const app = express();
var mongodb = require("mongodb");
const Mongoose = require("mongoose");
const router = express.Router();
const studentAccounting = require("../model/Student_Accounting");
Mongoose.model("studentaccounting");

router.post("/", async (req, res) => {
  console.log(req.body);
  const { Branch, Name, Description } = req.body;
  if (!(Branch && Name && Description)) {
    res.status(400).send("Data missing");
  } else {
    const studentaccounting = new studentAccounting(req.body);

    studentaccounting
      .save(req.body)
      .then((item) => {
        res
          .status(200)
          .send({ message: "Student account Saved in to Database" });
      })
      .catch((err) => {
        res.status(400).send("unable to save in database");
      });
  }
});

router.put("/", (req, res) => {
  studentAccounting.updateOne(
    { _id: req.query.id },
    req.body,
    (err, result) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send({ message: "Data updated" });
    }
  );
});
router.delete("/", (req, res) => {
  studentAccounting.deleteOne({ _id: req.query.id }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data deleted Successfully" });
  });
});
router.get("/", (req, res) => {
  var { page, limit, skippedItems } = req.query;

  skippedItems = (page - 1) * limit;

  studentAccounting
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
