const express = require("express");
const app = express();
var mongodb = require("mongodb");
const Mongoose = require("mongoose");
const router = express.Router();
const Branch = require("../model/Branch_Schema");
Mongoose.model("Branch");

router.post("/", async (req, res) => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!re.test(req.body.email)) {
    res.status(422).send("invlaid Email");
  } else {
    var re = /^(\+\d{1,3}[- ]?)?\d{9}$/;
    if (!re.test(req.body.Mobile_No)) {
      res.status(422).send("invlaid Mobile No");
    }
  }

  var data = new Branch(req.body);

  data
    .save()
    .then((item) => {
      res.status(200).send({ message: "Branch saved in database" });
    })
    .catch((err) => {
      res
        .status(400)
        .send({ message: "unable to save in database", Error: err });
    });
});

router.get("/", (req, res) => {
  var { page, limit, skippedItems } = req.query;
  skippedItems = (page - 1) * limit;

  Branch.find()
    .limit(limit)
    .skip(skippedItems)

    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      res.status(400).send("Data Not found");
    });
});
router.put("/", (req, res) => {
  Branch.updateOne({ _id: req.query.id }, req.body, (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data updated" });
  });
});

router.delete("/", (req, res) => {
  Branch.deleteOne({ _id: req.query.id }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data deleted Successfully" });
  });
});
module.exports = router;
