const express = require("express");
const app = express();
var mongodb = require("mongodb");
const mongoose = require("mongoose");
var url =
  "mongodb+srv://hxeon_22:HXEON22@cluster0.5x5xa.mongodb.net/SCHOOL_SYSTEM?retryWrites=true&w=majority";

app.use(express.json());

app.use(require("./api/routes/Branch"));
app.use(require("./api/routes/admission"));
app.use(require("./api/routes/Class"));
app.use(require("./api/routes/Section"));
app.use(require("./api/routes/ClassTeacher"));
app.use(require("./api/routes/Subject"));
app.use(require("./api/routes/ClassAssign"));
app.use(require("./api/routes/ClassSchedule"));
app.use(require("./api/routes/event_type"));
app.use(require("./api/routes/events"));
app.use(require("./api/routes/bookCategory"));
app.use(require("./api/routes/bookRequest"));
app.use(require("./api/routes/bookList"));
app.use(require("./api/routes/department"));
app.use(require("./api/routes/designation"));
app.use(require("./api/routes/employee"));
app.use(require("./api/routes/advance_salary"));
app.use(require("./api/routes/Leave_category"));
app.use(require("./api/routes/Parent"));
app.use(require("./api/routes/Homework"));
app.use(require("./api/routes/admin_user"));
app.use(require("./api/routes/payroll"));

//Data Base connection
mongoose.connect(
  url,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err, result) => {
    if (err) {
      throw err;
    } else console.log("Database is Connected");
  }
);

//Server
app.listen(5000, (err, result) => {
  if (err) {
    throw err;
  } else console.log("Server is running");
});
