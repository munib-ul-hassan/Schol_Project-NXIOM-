const express = require('express');
const app = express();

const adminUserRoute = require('./api/routes/admin_user');
const payrollRoute = require('./api/routes/payroll');
const departmentRoute = require('./api/routes/department');
const designationRoute = require('./api/routes/designation');
const employeeRoute = require('./api/routes/employee');
const advance_salaryRoute = require('./api/routes/advance_salary');
const leaveRoute = require('./api/routes/Leave_category');
const parentRoute = require('./api/routes/Parent');

const branchRoute = require('./api/routes/Branch');
const admissiontRoute = require('./api/routes/admission');
const classRoute = require('./api/routes/Class');
const sectionRoute = require('./api/routes/Section');
const classTeacherRoute = require('./api/routes/ClassTeacher');
const subjectRoute = require('./api/routes/Subject');
const classassignRoute = require('./api/routes/ClassAssign');
const classScheduleRoute = require('./api/routes/ClassSchedule');
const eventTypeRoute = require('./api/routes/event_type');
const eventsRoute = require('./api/routes/events');
const bookCategoryRoute = require('./api/routes/bookCategory');
const bookRequestRoute = require('./api/routes/bookRequest');
const booklistRoute = require('./api/routes/bookList');




const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://hxeon_22:HXEON22@cluster0.5x5xa.mongodb.net/SCHOOL_SYSTEM?retryWrites=true&w=majority')

mongoose.connection.on('error',err=>{
    console.log('connection Failed');
});

mongoose.connection.on('connected',connected=>{
    console.log('connect with database..............');
});

app.use(express.json());


//routes

app.use('/adminuser',adminUserRoute);
app.use('/payroll',payrollRoute);
app.use('/department',departmentRoute)
app.use('/designation',designationRoute);
app.use('/employee',employeeRoute);
app.use('/salary',advance_salaryRoute);
app.use('/leave',leaveRoute);
app.use('/parent',parentRoute);

// app.use('/branch',branchRoute);
// app.use('/admission',admissiontRoute);
// app.use('/class',classRoute);
// app.use('/section',sectionRoute);
// app.use('/class-teacher',classTeacherRoute);
// app.use('/subject',subjectRoute);
// app.use('/class-assign',classassignRoute);
// app.use('/class-schedule',classScheduleRoute);
// app.use('/event-type',eventTypeRoute);
// app.use('/events',eventsRoute);
// app.use('/book-category',bookCategoryRoute);
// app.use('/book-request',bookRequestRoute);
// app.use('/book-list',booklistRoute);


app.use((req,res,next)=>{
    res.status(400).json({
        error:"bad request"
    })
    
})


module.exports = app;