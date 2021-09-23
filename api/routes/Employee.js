const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = require('../model/employee');
const bcrypt = require('bcrypt');
const fs = require('fs');
const mime = require('mime');

const multer = require('multer');
// const upload = multer({dest:'uploads/'});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/profile/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().getDate()+new Date().getSeconds() + file.originalname);
    }
  });


  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
        
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    // limits: {
    //   fileSize: 1024 * 1024 * 5
    // },
    // fileFilter: fileFilter
  });



router.post('/add-employee',upload.single('profilePics'),(req,res,next)=>{

   
   
    const {
        branchId,
        roleId,
        joiningDate,
        designationId,
        departmentId,
        qualification,
        experienceDetails,
        totalExperince,
        name,
        gender,
        religion,
        bloodGroup,
        dateofbirth,
        mobileNo,
        email,
        presentAddress,
        permanentAddress,
        username,
        password,
        facebookLink,
        twitterLink,
        linkdinLind,
        skippedBankDetails,
        bankName,
        holderName,
        bankBranch,
        bankAddress,
        ifscCode,
        accountNo,
        
    }      = req.body;

    
    if(!branchId || !roleId || !joiningDate || !designationId || !departmentId ||!qualification || !experienceDetails || !totalExperince || !name || !gender
        ||!religion || !dateofbirth || !mobileNo || !email || !presentAddress ||!permanentAddress || !username || !password
        )
    {
        return res.status(200).json({
            'status':"0",
            "data":"{}",
            "message":"Please Insert All Required Fields"
        })
    }




   
  
  const checkEmail =  validateEmail(email);

    if(!checkEmail)
    {
         return res.status(200).json({
             'status':"0",
             "data":"{}",
             "message":"Please Insert Valid Email Id"
         })
    }


    Employee.findOne({$or:[{"email":email,"mobileNo":mobileNo}]}).then(result=>{
        if(result)
        {
            return res.status(200).json({
                'status':"0",
                "data":"{}",
                "message":"Email Or Phone Number Already Exist"
            })
        }else{
            bcrypt.hash(password,10,(err,hash)=>{

                if(err)
                {
                    return res.status(500).json({
                        error:err
                    })
                }else{

                    


                    const employee = new Employee({
                        _id:new mongoose.Types.ObjectId,
                        branchId:branchId,
                        roleId:roleId,
                        joiningDate:joiningDate,
                        designationId:designationId,
                        departmentId:departmentId,
                        qualification:qualification,
                        experienceDetails:experienceDetails,
                        totalExperince:totalExperince,
                        name:name,
                        gender:gender,
                        religion:religion,
                        bloodGroup:bloodGroup,
                        dateofbirth:dateofbirth,
                        mobileNo:mobileNo,
                        email:email,
                        presentAddress:presentAddress,
                        permanentAddress:permanentAddress,
                        username:username,
                        password:password,
                        facebookLink:facebookLink,
                        twitterLink:twitterLink,
                        linkdinLind:linkdinLind,
                        skippedBankDetails:skippedBankDetails,
                        bankName:bankName,
                        holderName:holderName,
                        bankBranch:bankBranch,
                        bankAddress:bankAddress,
                        ifscCode:ifscCode,
                        accountNo:accountNo,
                        profilePics:req.file.filename,
                        status:"1"
                    });

                    employee.save().then(result=>{
                      return  res.status(200).json({
                            'status':"1",
                            "data":"{}",
                            "message":"Employee Added Successfully"
                        })
                    }).catch(err=>{
                        return  res.status(500).json({
                            'status':"0",
                            "data":err,
                            "message":"Something Went Wrong"
                        })
                    })
                }
            })
        }
    })





})

router.get('/employee-list',(req,res,next)=>{
    Employee.find().then(result=>{
        return res.status(200).json({
            'status':"1",
            "data":result,
            "message":"Employee List Fetch Successfully"
        })
    }).catch(err=>{
        return res.status(500).json({
            'status':"0",
            "data":err,
            "message":"Something Went Wrong"
        })
    })
})

router.get('/employee-by-id/:id',(req,res,next)=>{
    if(!req.params.id)
    {
        return res.status(200).json({
            'status':"0",
            "data":"{}",
            "message":"Did Not Get Id"
        });
    }

    Employee.findOne({_id:req.params.id}).then(result=>{
        return res.status(200).json({
            'status':"1",
            "data":result,
            "message":"Employee List Fetch Successfully"
        })
    }).catch(err=>{
        return res.status(500).json({
            'status':"0",
            "data":err,
            "message":"Something Went Wrong"
        })
    })
})


router.put('/update-employee/:id',upload.single('profilePics'),(req,res,next)=>{
    const {
        branchId,
        roleId,
        joiningDate,
        designationId,
        departmentId,
        qualification,
        experienceDetails,
        totalExperince,
        name,
        gender,
        religion,
        bloodGroup,
        dateofbirth,
        mobileNo,
        email,
        presentAddress,
        permanentAddress,
        username,
        facebookLink,
        twitterLink,
        linkdinLind,
        skippedBankDetails,
        bankName,
        holderName,
        bankBranch,
        bankAddress,
        ifscCode,
        accountNo,
        profilePics
    }      = req.body;

    
    if(!branchId || !roleId || !joiningDate || !designationId || !departmentId ||!qualification || !experienceDetails || !totalExperince || !name || !gender
        ||!religion || !dateofbirth || !mobileNo || !email || !presentAddress ||!permanentAddress || !username
        )
    {
        return res.status(200).json({
            'status':"0",
            "data":"{}",
            "message":"Please Insert All Required Fields"
        })
    }


    
    if(req.file.filename = '')
    {
        return res.status(200).json({
            'status':"0",
            "data":"{}",
            "message":"Please Upload Image"
        })
    }

   
  
  const checkEmail =  validateEmail(email);

    if(!checkEmail)
    {
         return res.status(200).json({
             'status':"0",
             "data":"{}",
             "message":"Please Insert Valid Email Id"
         })
    }



     
          
    Employee.findOneAndUpdate({_id:req.params.id},{
        $set:{
            branchId:branchId,
            roleId:roleId,
            joiningDate:joiningDate,
            designationId:designationId,
            departmentId:departmentId,
            qualification:qualification,
            experienceDetails:experienceDetails,
            totalExperince:totalExperince,
            name:name,
            gender:gender,
            religion:religion,
            bloodGroup:bloodGroup,
            dateofbirth:dateofbirth,
            mobileNo:mobileNo,
            email:email,
            presentAddress:presentAddress,
            permanentAddress:permanentAddress,
            username:username,
            facebookLink:facebookLink,
            twitterLink:twitterLink,
            linkdinLind:linkdinLind,
            skippedBankDetails:skippedBankDetails,
            bankName:bankName,
            holderName:holderName,
            bankBranch:bankBranch,
            bankAddress:bankAddress,
            ifscCode:ifscCode,
            accountNo:accountNo,
            profilePics:req.file.filename,
            status:"1"
        }
    }).then(result=>{
        return res.status(200).json({
            'status':"1",
            "data":result,
            "message":"Employee Updated Successfully"
        })
    }).catch(err=>{
        return res.status(200).json({
            'status':"0",
            "data":err,
            "message":"Something Went Wrong"
        })
    })

                   
                
            



})



// delete

router.delete('/delete-employee/:id',(req,res,next)=>{

    Employee.deleteOne({_id:req.params.id}).then(result=>{
        res.status(200).json({
            'status':"1",
            "data":result,
            "message":"Employee Delete Duccessfully"
        })
    }).catch(err=>{
        res.status(500).json({
            'status':"0",
            "data":err,
            "message":"something went wrong"
        })
    })
})


//for upload profile pics
function uploadImage(profilePics)
{
    const matches = profilePics.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    const response = {};
    
    if (matches.length !== 3) {
        return res.status(200).json({
            'status':"0",
            "data":"{}",
            "message":"Profile Pics Invalid Input string"
        })
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
    let decodedImg = response;  
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    let extension = mime.getExtension(type);
    let fileName = Date.now()+"image." + extension;


    try {
            fs.writeFileSync("./uploads/profile/" + fileName, imageBuffer, 'utf8');
            return fileName;
        
        } catch (e) {
        next(e);
    }
}





function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }















module.exports = router;