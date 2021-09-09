const express = require("express");
const app = express();
var mongodb = require("mongodb");
const mongoose = require("mongoose");
var url =
  "mongodb+srv://hxeon_22:HXEON22@cluster0.5x5xa.mongodb.net/SCHOOL_SYSTEM?retryWrites=true&w=majority";
var body = require("body-parser");
app.use(express.json());
app.use(require("./Modules/Branch"));
app.use(require("./Modules/admission"));

//Data Base connection
mongoose.connect(
  url,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err, result) => {
    if (err) {
      console.log(err);
    } else console.log("Database is Connected");
  }
);

//Server
app.listen(5000, (err, result) => {
  if (err) {
    console.log(err);
  } else console.log("Server is running");
});
