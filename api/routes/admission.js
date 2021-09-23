const express = require("express");
const app = express();
var mongodb = require("mongodb");
const Mongoose = require("mongoose");
const routes = express.Router();
const Academydetails = require("../models/AcademisDetails");
Mongoose.model("Academydetails");
const student = require("../models/StudentDetails");
Mongoose.model("student");
const parent = require("../models//Parent_Schema");
Mongoose.model("parent");
const transports = require("../models/Transport");
Mongoose.model("transport");

routes.post("/admission", async (req, res) => {
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
    console.log(result);
    // if (result) {
    //   Student.academy = [result._id];
    // } else {
    var data = new Academydetails(req.body.Academy);
    data.save();

    Student.academy = data._id;
    //}
  });

  parent.findOne(req.body.parent, async (err, result) => {
    console.log(result);

    // if (result) {
    //   Student.parents = [result._id];
    // } else {
    var data = new parent(req.body.parent);
    data.save();

    Student.parents = data._id;
    //}
  });

  transports.findOne(req.body.Transport, (err, result) => {
    console.log(result);

    // if (result) {
    //   Student.transports = [result._id];
    // } else {
    var transport = new transports(req.body.Transport);
    transport.save();

    Student.transports = transport._id;
    //}
  });

  Student.save()
    .then((item) => {
      console.log(item);
      res.status(200).send({ message: "Admission Successfull", data: item });
    })
    .catch((err) => {
      res.status(400).send("unable to save in database");
    });
});

routes.get("/admission", (req, res) => {
  student.find({}, (err, result) => {
    console.log(result);
  });
  // Academydetails.find({}, (err, data) => {
  //   console.log(data);
  //   student.find({ academy: data._id }, (err, value) => {
  //     res.status(200).send(value);
  //   });
  // });
});

routes.put("/admission");

routes.delete("/admission");

module.exports = routes;