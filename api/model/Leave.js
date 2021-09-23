const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    branchId:[{type:mongoose.Types.ObjectId,ref:"branches"}],
    roleId:[{type:mongoose.Types.ObjectId,ref:"roles"}],
    empId:[{type:mongoose.Types.ObjectId,ref:"employees"}],
    leaveCatId:[{type:mongoose.Types.ObjectId,ref:"leave_categories"}],
    leaveDate:{
        type:Date,
        required:true
    },
    reason:String,
    attachment:String,
    comments:String

},{timestamps:true});


module.exports = mongoose.model('Leave',LeaveSchema);