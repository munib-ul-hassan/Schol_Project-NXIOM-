const express = require("express");
const app = express();
var mongodb = require("mongodb");
const Mongoose = require("mongoose");
const routes = express.Router();
const Branch = require("../models/Branch_Schema");
Mongoose.model("Branch");

routes.post("/createBranch", async (req, res) => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!re.test(req.body.email)) {
    res.status(422).send("invlaid Email");
  } else {
    var re = /^(\+\d{1,3}[- ]?)?\d{9}$/;
    if (!re.test(req.body.Mobile_No)) {
      res.status(422).send("invlaid Mobile No");
    }
  }
  // await upload(req, res);
  // if (req.file == undefined) {
  //   return res.send(`You must select a file.`);
  // }
  console.log(req.body);
  var data = new Branch(req.body);
  console.log(data);
  data
    .save()
    .then((item) => {
      console.log(item);
      res.send("Branch saved in database");
    })
    .catch((err) => {
      res
        .status(400)
        .send({ message: "unable to save in database", Error: err });
    });
});

routes.get("/Branch", (req, res) => {
  var { page, limit, skippedItems } = req.query;
  skippedItems = (page - 1) * limit;

  Branch.find()
    .limit(limit)
    .skip(skippedItems)

    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      res.status(400).send("Data Not found");
    });
});
routes.patch("/Branch", (req, res) => {
  Branch.updateOne({ _id: req.query.id }, req.body, (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data updated" });
  });
});

routes.delete("/Branch", (req, res) => {
  Branch.deleteOne({ _id: req.query.id }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data deleted Successfully" });
  });
});
module.exports = routes;
