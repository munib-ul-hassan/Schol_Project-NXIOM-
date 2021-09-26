const express = require("express");
const app = express();
var mongodb = require("mongodb");
const Mongoose = require("mongoose");
const routes = express.Router();
const bookList = require("../model/bookList");
Mongoose.model("bookList");
const multer = require("multer");

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
});

routes.post("/", upload.single("Cover"), async (req, res) => {
  const {
    Book_Title,
    Cover,
    Ediion,
    isbn,
    Department,
    Description,
    purchase_Date,
    price,
    author,
    publlisher,

    Tota_stock,
    issued_copies,
    Book_categoy,
    Branch,
  } = req.body;

  if (
    !(
      Book_Title &&
      Cover &&
      Ediion &&
      isbn &&
      Department &&
      Description &&
      purchase_Date &&
      price &&
      author &&
      publlisher &&
      Tota_stock &&
      issued_copies &&
      Book_categoy &&
      Branch
    )
  ) {
    res.send({ message: "All data requires" });
  } else {
    const bookListData = new bookList(req.body);

    bookListData
      .save(req.body)
      .then((item) => {
        res.status(200).send({ message: "bookList Saved in to Database" });
      })
      .catch((err) => {
        res
          .status(400)
          .send("unable to save in database", { message: err.message });
      });
  }
});

routes.put("/", (req, res) => {
  bookList.updateOne({ _id: req.query.id }, req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data updated" });
  });
});
routes.delete("/", (req, res) => {
  bookList.deleteOne({ _id: req.query.id }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send({ message: "Data deleted Successfully" });
  });
});
routes.get("/", (req, res) => {
  var { page, limit, skippedItems } = req.query;
  skippedItems = (page - 1) * limit;

  bookList
    .find()
    .limit(limit)
    .skip(skippedItems)
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      res.status(400).send("Data Not found");
    });
});

module.exports = routes;
