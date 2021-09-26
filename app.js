const express = require("express");
const app = express();
app.use(express.json());

const mongoose = require("mongoose");
require("dotenv").config();
var url = process.env.MONGO_URL;

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

//require router files
const branch = require("./api/router/Branch");
const admission = require("./api/router/admission");
const Class = require("./api/router/Class");
const Section = require("./api/router/Section");
const ClassTeacher = require("./api/router/ClassTeacher");
const subject = require("./api/router/Subject");
const ClassAssign = require("./api/router/ClassAssign");
const ClassSchedule = require("./api/router/ClassSchedule");
const Eventtype = require("./api/router/EventType");
const events = require("./api/router/events");
const bookCategory = require("./api/router/bookCategory");
const bookRequest = require("./api/router/bookRequest");
const bookList = require("./api/router/bookList");
const Student_Accounting = require("./api/router/StudentAccounting");
const FeesGroup = require("./api/router/FeesGroup");
const adminUserRoute = require("./api/router/AdminUser");
const payrollRoute = require("./api/router/payroll");
const departmentRoute = require("./api/router/department");
const designationRoute = require("./api/router/designation");
const employeeRoute = require("./api/router/employee");
const advance_salaryRoute = require("./api/router/AdvanceSalary");
const leaveRoute = require("./api/router/LeaveCategory");
const parentRoute = require("./api/router/Parent");
const homeworkRoute = require("./api/router/Homework");

//Routes
app.use("/adminuser", adminUserRoute);
app.use("/payroll", payrollRoute);
app.use("/department", departmentRoute);
app.use("/designation", designationRoute);
app.use("/employee", employeeRoute);
app.use("/salary", advance_salaryRoute);
app.use("/leave", leaveRoute);
app.use("/parent", parentRoute);
app.use("/homework", homeworkRoute);
app.use("/Branch", branch);
app.use("/Admission", admission);
app.use("/Class", Class);
app.use("/Section", Section);
app.use("/ClassTeacher", ClassTeacher);
app.use("/Subject", subject);
app.use("/ClassAssign", ClassAssign);
app.use("/ClassSchedule", ClassSchedule);
app.use("/Eventtype", Eventtype);
app.use("/events", events);
app.use("/bookCategory", bookCategory);
app.use("/bookRequest", bookRequest);
app.use("/bookList", bookList);
app.use("/StudentAccounting", Student_Accounting);
app.use("/FeesGroup", FeesGroup);

app.use((req, res, next) => {
  res.status(400).json({
    error: "bad request",
  });
});

module.exports = app;
