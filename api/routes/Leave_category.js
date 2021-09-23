const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');
const LeaveCategory = require('../model/Leave_category');
const Leave = require('../model/Leave');

const helper = require('../../helper/helper');

const multer = require('multer');
// const upload = multer({dest:'uploads/'});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/leave/');
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



router.post('/add-leave-category',(req,res,next)=>{
    const {branchId,categoryName} = req.body;
    if(!branchId || !categoryName)
    {
        return res.status(401).json({
            'status':"0",
            "data":"{}",
            "message":"Please Insert Required Field"
        })
    }

    LeaveCategory.findOne({categoryName:categoryName}).then(result=>{
        if(result)
        {
            return res.status(200).json({
                'status':"0",
                "data":"{}",
                "message":"Category Already Exist"
            });
        }else{
            const Leave_Category = new LeaveCategory({
                _id:new mongoose.Types.ObjectId,
                branchId:branchId,
                categoryName:categoryName
            })

            Leave_Category.save().then(result=>{
                return res.status(200).json({
                    'status':"1",
                    "data":result,
                    "message":"Category Add Successfully"
                });
            }).catch(err=>{
                return res.status(500).json({
                    'status':"0",
                    "data":err,
                    "message":"Something Went Wrong"
                })
            })
        }
    })



})


router.get('/leave-category-list',(req,res,next)=>{

    LeaveCategory.aggregate([
        

        {
            $lookup:{
                from:'branches',
                localField:'branchId',
                foreignField:'_id',
                as: 'branchDetails'

            },
            
        },

        // { $unwind: "$advance_salaries" },
        // {
        //     $lookup: {
        //         from: "branches",
        //         localField: "branchId",
        //         foreignField: "_id",
        //         as: "branchDe"
        //     }
        // },


       

    ]).exec((err,result)=>{
        if(err) throw err;
        return res.status(200).json({
            'status':"1",
            "data":result,
            "message":"Fetch Leave Category"
        })
    })

  
})

router.get('/leave-category-by-id/:id',(req,res,next)=>{
    if(!req.params.id)
    {
        return res.status(200).json({
            'status':"0",
            "data":"{}",
            "message":"Did Not Get Id"
        });
    }

    LeaveCategory.findOne({_id:req.params.id}).then(result=>{
        return res.status(200).json({
            'status':"1",
            "data":result,
            "message":"Department List Fetch Successfully"
        })
    }).catch(err=>{
        return res.status(500).json({
            'status':"0",
            "data":err,
            "message":"Something Went Wrong"
        })
    })
})

router.put('/update-leave-category/:id',(req,res,next)=>{
    const {branchId,categoryName} = req.body;

    if(!branchId || !categoryName)
    {
        return res.status(401).json({
            'status':"0",
            "data":"{}",
            "message":"Please Insert Required Field"
        })
    }
    LeaveCategory.findOneAndUpdate({_id:req.params.id},{
        $set:{
            branchId:branchId,
            categoryName:categoryName
        }
    }).then(result=>{
        return res.status(200).json({
            'status':"1",
            "data":result,
            "message":"LeaveCategory Updated Successfully"
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

router.delete('/delete-leave-category/:id',(req,res,next)=>{

    LeaveCategory.deleteOne({_id:req.params.id}).then(result=>{
        res.status(200).json({
            'status':"1",
            "data":result,
            "message":"LeaveCategory Delete Duccessfully"
        })
    }).catch(err=>{
        res.status(500).json({
            'status':"0",
            "data":err,
            "message":"something went wrong"
        })
    })
})


// leave request by user

router.post('/add-leave',upload.single('attachment'),(req,res,next)=>{
    
    const {branchId,roleId,empId,leaveCatId,leaveDate,reason,comments} = req.body;

    if(!branchId || !roleId || !empId || !leaveCatId || !leaveDate )
    {
        return res.status(200).json({
            'status':"0",
            "data":"{}",
            "message":"Please Insert All Required Fields"
        })
    }

  
    

        const leave = new Leave({
            _id:new mongoose.Types.ObjectId,
            branchId,
            roleId,
            empId,
            leaveCatId,
            leaveDate,
            reason,
            attachment:req.file.filename
        })

        leave.save().then(result=>{
            return res.status(200).json({
                'status':"1",
                "data":result,
                 "message":"Leave Request Sent Successfully"
            });
        }).catch(err=>{
           return  res.status(500).json({
                'status':"0",
                "data":err,
                 "message":"Something Went Wrong"
            });
        })


})

router.get('/leave-list',(req,res,next)=>{

    Leave.aggregate([       

        {
            $lookup:{
                from:'branches',
                localField:'branchId',
                foreignField:'_id',
                as: 'branchDetails'

            },
            
        },  



       

    ]).exec((err,result)=>{
        if(err) throw err;
        return res.status(200).json({
            'status':"1",
            "data":result,
            "message":"Fetch Leave Category"
        })
    })

  
})







module.exports = router;