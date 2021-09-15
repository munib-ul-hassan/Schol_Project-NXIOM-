const express = require("express");
const app = express();
var mongodb = require("mongodb");
const Mongoose = require("mongoose");
const routes = express.Router();
const Academydetails = require("../models/admission/AcademisDetails");
Mongoose.model("Academydetails");
const student = require("../models/admission/StudentDetails");
Mongoose.model("student");
const parent = require("../models/admission/Parent_Schema");
Mongoose.model("parent");
const transports = require("../models/admission/Transport");
Mongoose.model("transport");

routes.post("/admission", (req, res) => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!re.test(req.body.Student.Email)) {
    res.status(422).send("invlaid Email");
  } else {
    var re = /^(\+\d{1,3}[- ]?)?\d{9}$/;
    if (!re.test(req.body.Student.Mobile_No)) {
      res.status(422).send("invlaid Mobile No");
    }
  }
  var date = req.body.Student.Admission_Date.split("-");
  req.body.Student.Admission_Date = new Date(date[0], date[1], date[2]);
  var date = req.body.Student.DOB.split("-");
  req.body.Student.DOB = new Date(date[0], date[1], date[2]);

  var Student = new student(req.body.Student);

  Academydetails.findOne(req.body.Academy, async (err, result) => {
    if (result) {
      console.log(typeof Student.academy);
      console.log(Student.academy);
      Student.academy = result._id;
      console.log(Student.academy);
    } else {
      var data = new Academydetails(req.body.Academy);
      data.save();
      console.log(typeof Student.academy);
      Student.academy = data._id;
    }
  });

  parent.findOne(req.body.parent, async (err, result) => {
    if (result) {
      console.log(typeof Student.parents);
      console.log(Student.parents);

      Student.parents = result._id;
      console.log(Student.parents);
    } else {
      var data = new parent(req.body.parent);
      data.save();
      console.log(typeof Student.parents);
      Student.parents = data._id;
    }
  });

  transports.findOne(req.body.Transport, (err, result) => {
    if (result) {
      Student.transports = result._id;
    } else {
      var transport = new transports(req.body.Transport);
      transport.save();
      console.log(typeof Student.transport);
      Student.transports = transport._id;
    }
  });

  Student.save()
    .then((item) => {
      console.log(item);
      res.send("Admission Successfull");
    })
    .catch((err) => {
      res.status(400).send("unable to save in database");
    });
});

routes.get("/admission", (req, res) => {
  Academydetails.findOne(req.body, (err, data) => {
    student.find({ academy: data._id }, (err, value) => {
      res.status(200).send(value);
    });
  });
});

routes.patch("/admission");

routes.delete("/admission");

module.exports = routes;
