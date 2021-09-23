const mongoose = require('mongoose');


const parentSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    branchId:[{type:mongoose.Types.ObjectId,ref:'Branch'}],
   
    name:{
        type:String,
        required:true
    },
    relation:String,
    fatherName:String,
    motherName:String,
    occupation:String,
    income:Number,
    education:String,
    mobileNo:Number,
    email:{type:String,required:true,unique:true},
    city:String,
    state:String,
    address:String,
    facebookLink:String,
    twitterLink:String,
    linkdinLind:String,    
    profilePics:String,
    status:{type:String,enum:['1', 'Appr0oved'],default:"1"},
},{timestamps:true});


module.exports = mongoose.model('Parent',parentSchema);