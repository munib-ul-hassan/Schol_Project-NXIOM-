const mongoose = require('mongoose');

const SalaryAssignSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    employeeId:String,
    payrollId:String
},{timestamps:true});


module.exports = mongoose.model('Salary_assign',SalaryAssignSchema);