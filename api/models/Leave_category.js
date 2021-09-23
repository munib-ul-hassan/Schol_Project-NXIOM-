const mongoose = require('mongoose');

const LeaveCategorySchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    branchId:[{type:mongoose.Types.ObjectId,ref:'Branch'}],
    categoryName:{
        type:String,
        required:true,
        unique:true

    },
    roleId:[{type:mongoose.Types.ObjectId,ref:'Role'}],
    days:{
        type:Number,
        require:true
    }
},{timestamps:true})


module.exports = mongoose.model('Leave_category',LeaveCategorySchema);