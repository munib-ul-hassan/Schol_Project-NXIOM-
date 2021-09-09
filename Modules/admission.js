const express = require("express");
const app = express();
var mongodb = require("mongodb");
const Mongoose = require("mongoose");
const routes = express.Router();
const admission = require("../models/admission/AcademisDetails");
Mongoose.model("admission");
const student = require("../models/admission/StudentDetails");
Mongoose.model("student");

routes.post("/admission", (req, res) => {
  console.log(req.body);

  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!re.test(req.body.Student.Email)) {
    res.status(422).send("invlaid Email");
  } else {
    var re = /^(\+\d{1,3}[- ]?)?\d{9}$/;
    if (!re.test(req.body.Student.Mobile_No)) {
      res.status(422).send("invlaid Mobile No");
    }
  }
  var date = req.body.Academy.Admission_Date.split("-");
  req.body.Academy.Admission_Date = new Date(date[0], date[1], date[2]);
  var date = req.body.Student.DOB.split("-");
  req.body.Student.DOB = new Date(date[0], date[1], date[2]);
  var data = new admission(req.body.Academy);
  var Student = new student(req.body.Student);
  data
    .save()
    .then(
      Student.save()
        .then((item) => {
          res.send("Admission Successfull");
        })
        .catch((err) => {
          res.status(400).send("unable to save in database");
        })
    )
    .catch((err) => {
      res.status(400).send("unable to save in database");
    });
});

routes.get("/admission");

routes.patch("/admission");

routes.delete("/admission");

module.exports = routes;
