const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Designation = require("../model/designation");

router.post("/add-designation", (req, res, next) => {
  const { branchId, designationName } = req.body;
  if (!branchId || !designationName) {
    return res.status(401).json({
      status: "0",
      data: "{}",
      message: "Please Insert Required Field",
    });
  }

  Designation.findOne({ designationName: designationName }).then((result) => {
    if (result) {
      return res.status(200).json({
        status: "0",
        data: "{}",
        message: "Designation Already Exist",
      });
    } else {
      const designation = new Designation({
        _id: new mongoose.Types.ObjectId(),
        branchid: branchId,
        designationName: designationName,
      });

      designation
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

router.get("/designation-list", (req, res, next) => {
  Designation.find()
    .then((result) => {
      return res.status(200).json({
        status: "1",
        data: result,
        message: "Designation List Fetch Successfully",
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

router.get("/designation-by-id/:id", (req, res, next) => {
  if (!req.params.id) {
    return res.status(200).json({
      status: "0",
      data: "{}",
      message: "Did Not Get Id",
    });
  }

  Designation.findOne({ _id: req.params.id })
    .then((result) => {
      return res.status(200).json({
        status: "1",
        data: result,
        message: "Designation List Fetch Successfully",
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

router.put("/update-designation/:id", (req, res, next) => {
  const { branchId, designationName } = req.body;

  if (!branchId || !designationName) {
    return res.status(401).json({
      status: "0",
      data: "{}",
      message: "Please Insert Required Field",
    });
  }

  Designation.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        branchId: branchId,
        designationName: designationName,
      },
    }
  )
    .then((result) => {
      return res.status(200).json({
        status: "1",
        data: result,
        message: "Designation Updated Successfully",
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

router.delete("/delete-designation/:id", (req, res, next) => {
  Designation.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        status: "1",
        data: result,
        message: "Designation Delete Duccessfully",
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
