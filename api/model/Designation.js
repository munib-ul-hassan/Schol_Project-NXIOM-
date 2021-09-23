const mongoose = require('mongoose');


const designationSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    branchId:[{type:mongoose.Types.ObjectId,ref:'Branch'}],
    designationName:String
},{timestamps:true});


module.exports = mongoose.model('Designation',designationSchema);