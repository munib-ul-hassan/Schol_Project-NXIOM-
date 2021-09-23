const mongoose = require('mongoose');


const employeeSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    branchId:[{type:mongoose.Types.ObjectId,ref:'Branch'}],
    roleId:String,
    joiningDate:Date,
    designationId:[{type:mongoose.Types.ObjectId,ref:'Designation'}],
    departmentId:[{type:mongoose.Types.ObjectId,ref:'Department'}],
    qualification:String,
    experienceDetails:String,
    totalExperince:Number,
    name:String,
    gender:String,
    religion:String,
    bloodGroup:String,
    dateofbirth:Date,
    mobileNo:Number,
    email:{type:String,required:true,unique:true},
    presentAddress:String,
    permanentAddress:String,
    username:String,
    password:String,
    facebookLink:String,
    twitterLink:String,
    linkdinLind:String,
    bankName:String,
    skippedBankDetails:Number,
    holderName:String,
    bankBranch:String,
    bankAddress:String,
    ifscCode:String,
    accountNo:String,
    profilePics:String,
    status:Number
},{timestamps:true});


module.exports = mongoose.model('Employee',employeeSchema);