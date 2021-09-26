const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Parent = require("../model/parent");
const helper = require("../../helper/helper");

const multer = require("multer");
// const upload = multer({dest:'uploads/'});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/profile/");
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

router.post("/add-parent", upload.single("profilePics"), (req, res, next) => {
  const {
    branchId,
    name,
    relation,
    fatherName,
    motherName,
    occupation,
    income,
    education,
    mobileNo,
    email,
    city,
    state,
    address,
    facebookLink,
    twitterLink,
    linkdinLind,
  } = req.body;

  if (!branchId || !name || !relation || !mobileNo || !email) {
    return res.status(200).json({
      status: "0",
      data: "{}",
      message: "Please Insert All Required Fields",
    });
  }

  const checkEmail = helper.validateEmail(email);

  if (!checkEmail) {
    return res.status(200).json({
      status: "0",
      data: "{}",
      message: "Please Insert Valid Email Id",
    });
  }

  Parent.findOne({ $or: [{ email: email, mobileNo: mobileNo }] }).then(
    (result) => {
      if (result) {
        return res.status(200).json({
          status: "0",
          data: "{}",
          message: "Email Or Phone Number Already Exist",
        });
      } else {
        const profileImage = "";
        if (req.file != undefined) {
          profileImage = req.file.filename;
        }

        const parent = new Parent({
          _id: new mongoose.Types.ObjectId(),
          branchId,
          name,
          relation,
          fatherName,
          motherName,
          occupation,
          income,
          education,
          mobileNo,
          email,
          city,
          state,
          address,
          facebookLink,
          twitterLink,
          linkdinLind,
          profilePics: profileImage,
          status: "1",
        });

        parent
          .save()
          .then((result) => {
            return res.status(200).json({
              status: "1",
              data: "{}",
              message: "Parent Added Successfully",
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
    }
  );
});

router.get("/parent-list", (req, res, next) => {
  Parent.aggregate([
    {
      $lookup: {
        from: "branches",
        localField: "branchId",
        foreignField: "_id",
        as: "branchDetails",
      },
    },
  ]).exec((err, result) => {
    if (err) throw err;
    return res.status(200).json({
      status: "1",
      data: result,
      message: "Fetch Leave Category",
    });
  });
});

router.get("/parent-by-id/:id", (req, res, next) => {
  if (!req.params.id) {
    return res.status(200).json({
      status: "0",
      data: "{}",
      message: "Did Not Get Id",
    });
  }

  Parent.findOne({ _id: req.params.id })
    .then((result) => {
      return res.status(200).json({
        status: "1",
        data: result,
        message: "Parent List Fetch Successfully",
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

router.put(
  "/update-parent/:id",
  upload.single("profilePics"),
  (req, res, next) => {
    const {
      branchId,
      name,
      relation,
      fatherName,
      motherName,
      occupation,
      income,
      education,
      mobileNo,
      email,
      city,
      state,
      address,
      facebookLink,
      twitterLink,
      linkdinLind,
    } = req.body;

    if (!branchId || !name || !relation || !mobileNo || !email) {
      return res.status(200).json({
        status: "0",
        data: "{}",
        message: "Please Insert All Required Fields",
      });
    }

    const checkEmail = helper.validateEmail(email);

    if (!checkEmail) {
      return res.status(200).json({
        status: "0",
        data: "{}",
        message: "Please Insert Valid Email Id",
      });
    }

    Parent.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          branchId,
          name,
          relation,
          fatherName,
          motherName,
          occupation,
          income,
          education,
          mobileNo,
          email,
          city,
          state,
          address,
          facebookLink,
          twitterLink,
          linkdinLind,
        },
      }
    )
      .then((result) => {
        return res.status(200).json({
          status: "1",
          data: result,
          message: "Parent Updated Successfully",
        });
      })
      .catch((err) => {
        return res.status(200).json({
          status: "0",
          data: err,
          message: "Something Went Wrong",
        });
      });
  }
);

// delete

router.delete("/delete-parent/:id", (req, res, next) => {
  Parent.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        status: "1",
        data: result,
        message: "Parent Delete Duccessfully",
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
