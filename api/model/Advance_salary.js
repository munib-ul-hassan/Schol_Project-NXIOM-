const mongoose = require('mongoose');

AdanceSalarySchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    branchId:[{type:mongoose.Types.ObjectId,ref:'Branch'}],
    roleId:String,
    employeeId:[{type:mongoose.Types.ObjectId,ref:'Employee'}],
    deductMonth:String,
    amount:Number,
    reason:String,
    status:{type:String,enum:['Pending', 'Approved','Reject'],default:"Pending"},
},{timestamps:true})




module.exports = mongoose.model('Advance_salary',AdanceSalarySchema);