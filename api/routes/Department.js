const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Department = require("../models/department");

router.post("/add-department", (req, res, next) => {
  const { branchId, departmentName } = req.body;
  if (!branchId || !departmentName) {
    return res.status(401).json({
      status: "0",
      data: "{}",
      message: "Please Insert Required Field",
    });
  }

  Department.findOne({ departmentName: departmentName }).then((result) => {
    if (result) {
      return res.status(200).json({
        status: "0",
        data: "{}",
        message: "Department Already Exist",
      });
    } else {
      const department = new Department({
        _id: new mongoose.Types.ObjectId(),
        branchid: branchId,
        departmentName: departmentName,
      });

      department
        .save()
        .then((result) => {
          return res.status(200).json({
            status: "1",
            data: result,
            message: "Department Add Successfully",
          });
        })
        .catch((err) => {
          return res.status(500).json({
            status: "0",
            data: err,
            message: "Something Went Wrong",
          });
        });
    }
  });
});

router.get("/department-list", (req, res, next) => {
  Department.find()
    .then((result) => {
      return res.status(200).json({
        status: "1",
        data: result,
        message: "Department List Fetch Successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "0",
        data: err,
        message: "Something Went Wrong",
      });
    });
});

router.get("/department-by-id/:id", (req, res, next) => {
  if (!req.params.id) {
    return res.status(200).json({
      status: "0",
      data: "{}",
      message: "Did Not Get Id",
    });
  }

  Department.findOne({ _id: req.params.id })
    .then((result) => {
      return res.status(200).json({
        status: "1",
        data: result,
        message: "Department List Fetch Successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "0",
        data: err,
        message: "Something Went Wrong",
      });
    });
});

router.put("/update-department/:id", (req, res, next) => {
  const { branchId, departmentName } = req.body;

  if (!branchId || !departmentName) {
    return res.status(401).json({
      status: "0",
      data: "{}",
      message: "Please Insert Required Field",
    });
  }
  Department.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        branchId: branchId,
        departmentName: departmentName,
      },
    }
  )
    .then((result) => {
      return res.status(200).json({
        status: "1",
        data: result,
        message: "Department Updated Successfully",
      });
    })
    .catch((err) => {
      return res.status(200).json({
        status: "0",
        data: err,
        message: "Something Went Wrong",
      });
    });
});

// delete

router.delete("/delete-department/:id", (req, res, next) => {
  Department.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        status: "1",
        data: result,
        message: "Department Delete Duccessfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "0",
        data: err,
        message: "something went wrong",
      });
    });
});

module.exports = router;
