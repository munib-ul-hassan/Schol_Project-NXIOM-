const mongoose = require('mongoose');
const validator = require('validator');

const homeworkSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    branchId:[{type:mongoose.Types.ObjectId,ref:'Branch'}],
    classId:[{type:mongoose.Types.ObjectId,ref:'Class'}],
    sectionId:[{type:mongoose.Types.ObjectId,ref:'Section'}],
    subjectId:[{type:mongoose.Types.ObjectId,ref:'subject'}],
    dateofhomework:{
        type:Date,
        required:true
    },
    dateofsubmission:{
        type:Date,
        required:true
    },
    scheduleDate:{
        type:Date
    },
    homework:{
        type:String,
        required:true
    },
    attachment:String,
 
    publishlater:{type:String,enum:['0', '1'],default:"0"},
},{timestamps:true});

module.exports = mongoose.model('Homework',homeworkSchema);