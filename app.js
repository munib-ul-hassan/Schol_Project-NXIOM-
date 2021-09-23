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


app.use((req,res,next)=>{
    res.status(400).json({
        error:"bad request"
    })
    
})


module.exports = app;