const express = require("express");
const app = express();
var mongodb = require("mongodb");
const Mongoose = require("mongoose");
const router = express.Router();
const Feesgroup = require("../model/FeesGroup");
Mongoose.model("feesgroup");

router.post("/feesgroup", async (req, res) => {
  console.log(req.body);
  const { Branch, Name, Description, feestype } = req.body;

  if (!(Branch && Name && Description, feestype.length > 0)) {
    res.status(400).send("Data missing");
  } else {
    const feesgroup = new Feesgroup(req.body);

    feesgroup
      .save(req.body)
      .then((item) => {
        res.status(200).send({ message: "Student group Saved in to Database" });
      })
      .catch((err) => {
        res.status(400).send("unable to save in database");
      });
  }
});

router.put("/feesgroup", (req, res) => {
  Feesgroup.updateOne({ _id: req.query.id }, req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data updated" });
  });
});
router.delete("/feesgroup", (req, res) => {
  Feesgroup.deleteOne({ _id: req.query.id }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data deleted Successfully" });
  });
});
router.get("/feesgroup", (req, res) => {
  var { page, limit, skippedItems } = req.query;

  skippedItems = (page - 1) * limit;

  Feesgroup.find()
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
