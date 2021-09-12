const express = require("express");
const app = express();
var mongodb = require("mongodb");
const mongoose = require("mongoose");
var url =
  "mongodb+srv://hxeon_22:HXEON22@cluster0.5x5xa.mongodb.net/SCHOOL_SYSTEM?retryWrites=true&w=majority";
var body = require("body-parser");
app.use(express.json());
app.use(require("./api/routes/Branch"));
app.use(require("./api/routes/admission"));
app.use(require("./api/routes/Class"));
app.use(require("./api/routes/Section"));
app.use(require("./api/routes/ClassTeacher"));
app.use(require("./api/routes/Subject"));
app.use(require("./api/routes/ClassAssign"));

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
