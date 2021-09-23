const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const AdvanceSalary = require('../model/Advance_salary');


router.post('/add-advance-salary',(req,res,next)=>{
    const {branchId,roleId,employeeId,deductMonth,amount,reason} = req.body;
    
    if(!branchId || !roleId || !employeeId || !deductMonth || !amount || !reason)
    {
        return res.status(401).json({
            'status':"0",
            "data":"{}",
            "message":"Please Insert Required Field"
        })
    }

    const Advance_Salary = new AdvanceSalary({
        _id:new mongoose.Types.ObjectId,
        branchId,
        roleId,
        employeeId,
        deductMonth,
        amount,
        reason,
        status:"Pending"


    })

    Advance_Salary.save().then(result=>{
        res.status(200).json({
            'status':"1",
            "data":result,
            "message":"Advance Salary Request Has been sent"
        })
    }).catch(err=>{
        res.status(500).json({
            'status':"0",
            "data":err,
            "message":"Something Went Wrong"
        })
    })

})


// fetch advance salary

router.get('/advance-salary-by-id/:id',(req,res,next)=>{
   
    
    if(!req.params.id)
    {
        return res.status(401).json({
            'status':"0",
            "data":"{}",
            "message":"Please Insert Required Field"
        })
    }

   

    AdvanceSalary.aggregate([
        

        {
            $lookup:{
                from:'employees',
                localField:'employeeId',
                foreignField:'_id',
                as: 'employeeDetails'

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
            "message":"Fetch Advance Salary"
        })
    })


})



// update salary status


router.put('/update-salary-status/:id',(req,res,next)=>{
   
    
    if(!req.params.id)
    {
        return res.status(401).json({
            'status':"0",
            "data":"{}",
            "message":"Please Insert Required Field"
        })
    }

    AdvanceSalary.findOneAndUpdate({_id:req.params.id},{
        $set:{
            status:"Approved"
        }
    }).then(result=>{
        res.status(200).json({
            'status':"1",
            "data":result,
            "message":"Status Update"
        })
    }).catch(err=>{
        res.status(500).json({
            'status':"0",
            "data":err,
            "message":"Something Went Wrong"
        })
    })


})












module.exports = router;