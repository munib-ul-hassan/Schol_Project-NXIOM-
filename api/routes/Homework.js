const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Homework = require("../models/Homework");

router.use(express.static(__dirname + "./uploads/"));

const multer = require("multer");
// const upload = multer({dest:'uploads/'});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/homework/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().getDate() + new Date().getSeconds() + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5
  // },
  // fileFilter: fileFilter
});

router.post("/add-homework", upload.single("attachment"), (req, res, next) => {
  const homework = new Homework({
    _id: new mongoose.Types.ObjectId(),
    branchId: req.body.branchId,
    classId: req.body.classId,
    sectionId: req.body.sectionId,
    subjectId: req.body.subjectId,
    dateofhomework: req.body.dateofhomework,
    dateofsubmission: req.body.dateofsubmission,
    scheduleDate: req.body.scheduleDate,
    homework: req.body.homework,
    attachment: req.file.filename,
  });

  homework
    .save()
    .then((result) => {
      return res.status(200).json({
        success: true,
        data: result,
        message: "Homework Added Successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        data: err,
        message: "Something Went wrong",
      });
    });
});

router.get("/homework-list", (req, res, next) => {
  Homework.aggregate([
    {
      $lookup: {
        from: "branches",
        localField: "branchId",
        foreignField: "_id",
        as: "branchDetails",
      },
    },
  ]).exec((err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        data: err,
        message: "Something Went wrong",
      });
    } else {
      return res.status(200).json({
        success: true,
        data: result,
        message: "Fetch Homework Category",
      });
    }
  });
});

router.get("/homework-by-id/:id", (req, res, next) => {
  if (!req.params.id) {
    return res.status(401).json({
      success: false,
      data: "{}",
      message: "Did Not Get Id",
    });
  }

  Homework.findOne({ _id: req.params.id })
    .then((result) => {
      return res.status(200).json({
        success: true,
        data: result,
        message: "Homework List Fetch Successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        data: err,
        message: "Something Went Wrong",
      });
    });
});

router.put(
  "/update-homework/:id",
  upload.single("attachment"),
  (req, res, next) => {
    Homework.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          branchId: req.body.branchId,
          classId: req.body.classId,
          sectionId: req.body.sectionId,
          subjectId: req.body.subjectId,
          dateofhomework: req.body.dateofhomework,
          dateofsubmission: req.body.dateofsubmission,
          scheduleDate: req.body.scheduleDate,
          homework: req.body.homework,
          attachment: req.file.filename,
        },
      }
    )
      .then((result) => {
        return res.status(200).json({
          status: "1",
          data: result,
          message: "Employee Updated Successfully",
        });
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          data: err,
          message: "Something Went Wrong",
        });
      });
  }
);

// delete

router.delete("/delete-homework/:id", (req, res, next) => {
  Homework.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        success: true,
        data: result,
        message: "Homework Delete Duccessfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        data: err,
        message: "something went wrong",
      });
    });
});

module.exports = router;
