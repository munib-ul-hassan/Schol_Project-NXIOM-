const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    branchId:Number,
    salaryGrade:String,
    basicSalay:String,
    overTime:String,
    allowances:String,
    deduction:String,
    totalAllowance:String,
    totalDeduction:String,
    netSalay:String
},
{ timestamps: true}
);

module.exports = mongoose.model('Payroll',payrollSchema);