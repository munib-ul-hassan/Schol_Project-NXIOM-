const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    branchId:[{type:mongoose.Types.ObjectId,ref:'Branch'}],
    departmentName:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true});


module.exports = mongoose.model('Department',departmentSchema);