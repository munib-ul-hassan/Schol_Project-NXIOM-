const express = require("express");
const app = express();
var mongodb = require("mongodb");
const Mongoose = require("mongoose");
const routes = express.Router();
const Academydetails = require("../model/AcademisDetails");
Mongoose.model("Academydetails");
const student = require("../model/StudentDetails");
Mongoose.model("student");
const parent = require("../model/Parent_Schema");
Mongoose.model("parent");
const transports = require("../model/Transport");
Mongoose.model("transport");

routes.post("/", async (req, res) => {
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
    if (result) {
      Student.academy = [{ _id: result._id }];
    } else {
      var data = new Academydetails(req.body.Academy);
      data.save();

      Student.academy = data._id;
    }
  });

  parent.findOne(req.body.parent, async (err, result) => {
    console.log(result);

    if (result) {
      Student.parents = [{ _id: result._id }];
    } else {
      var data = new parent(req.body.parent);
      data.save();

      Student.parents = data._id;
    }
  });

  transports.findOne(req.body.Transport, (err, result) => {
    console.log(result);

    if (result) {
      Student.transports = [{ _id: result._id }];
    } else {
      var transport = new transports(req.body.Transport);
      transport.save();

      Student.transports = transport._id;
    }
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

routes.get("/", (req, res) => {
  student.find({}, (err, result) => {
    if (err) {
      res.status(400).json({ messgae: "Not data found" });
    } else {
      res.status(400).json({ messgae: "Not data found" });
    }
  });
});

routes.put("/", (req, res) => {
  const { id } = req.query;
  if (!id) {
    res.status(400).json({ message: "Id not found" });
  } else {
    student.find({ _id: id }, (err, result) => {
      if (result) {
        student.updateOne({ _id: id }, req.body);
        res.status(200).send({ message: "Data updated successfully " });
      } else {
        res.status(400).send({ message: "Data Not found " });
      }
    });
  }
});

routes.delete("/", (req, res) => {
  const { id } = req.query;
  if (!id) {
    res.status(400).json({ message: "Id not found" });
  } else {
    student.find({ _id: id }, (err, result) => {
      if (result) {
        student.deleteeOne({ _id: id }, req.body);
        res.status(200).send({ message: "Data deleted successfully " });
      } else {
        res.status(400).send({ message: "Data Not found " });
      }
    });
  }
});

module.exports = routes;
