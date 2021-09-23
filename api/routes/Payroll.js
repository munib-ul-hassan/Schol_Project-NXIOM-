const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Payroll = require('../model/payroll');
const SalaryAssign = require('../model/salary_assign');


// create salary template
router.post('/create-salary-template',(req,res,next)=>{

    const {branchId,salaryGrade,basicSalay,overTime,totalAllowance,totalDeduction,netSalay,allowances,deduction}  = req.body;
    if(!branchId || !salaryGrade || !basicSalay || !overTime || !totalAllowance || !totalDeduction || !netSalay)
    {
        return res.status(200).json({
            'status':"0",
            "data":"{}",
            "message":"Please Insert All Required Fields"
        });
    }

    Payroll.findOne({'salaryGrade':salaryGrade}).then(payroll=>{
        if(payroll)
        {
            return res.status(200).json({
                'status':"0",
                "data":"{}",
                "message":"Payroll  Already Exist"
            });
        }else{
            const payroll = new Payroll({
                _id:new mongoose.Types.ObjectId,
                branchId:branchId,
                salaryGrade:salaryGrade,
                basicSalay:basicSalay,
                overTime:overTime,
                totalAllowance:totalAllowance,
                totalDeduction:totalDeduction,
                netSalay:netSalay,
                allowances:JSON.stringify(allowances),
                deduction:JSON.stringify(deduction),

            });

            payroll.save().then(result=>{
                res.status(200).json({
                    'status':"1",
                    "data":result,
                    "message":"Payroll Add  Successfully"
                })
            }).catch(err=>{
                res.status(500).json({
                    'status':"0",
                    "data":"{}",
                    "message":err
                })

            })
        }
    })

});

// salary tempalte list

router.get("/salary-template-list",(req,res,nest)=>{
    
    Payroll.find().then(payroll=>{
        res.status(200).json({
            "status":"1",
            "data":payroll,
            "message":"List Fetch Successfully"
        })
    }).catch(err=>{
        res.status(500).json({
            "status":"0",
            "data":'{}',
            "message":err
        })
    })
})

router.get("/salary-by-id/:id",(req,res,next)=>{
    

    if(!req.params.id)
    {
        return res.status(200).json({
            'status':"0",
            "data":"{}",
            "message":"Please Insert All Required Fields"
        });
    }

    Payroll.findById(req.params.id).then(result=>{
        res.status(200).json({
            "status":"1",
            "data":result,
            "message":"data fetch successfully"
        })
        
    }).catch(err=>{
        res.status(500).json({
            "status":"0",
            "data":err,
            "message":"Something went wrong"
        })
    })
    
});




router.put('/update-salary-tempate/:id',(req,res,next)=>{
    // console.log(req.params.id);

    const {branchId,netSalay,salaryGrade,basicSalay,overTime,totalAllowance,totalDeduction,allowances,deduction} = req.body;

    if(!branchId || !salaryGrade || !basicSalay || !overTime || !totalAllowance || !totalDeduction || !netSalay)
    {
        return res.status(200).json({
            'status':"0",
            "data":"{}",
            "message":"Please Insert All Required Fields"
        });
    }



    Payroll.findOneAndUpdate({_id:req.params.id},{
        $set:{
            branchId:branchId,
            salaryGrade:salaryGrade,
            basicSalay:basicSalay,
            overTime:overTime,
            totalAllowance:totalAllowance,
            totalDeduction:totalDeduction,
            netSalay:netSalay,
            allowances:JSON.stringify(allowances),
            deduction:JSON.stringify(deduction),
        }
    }).then(result=>{
        res.status(200).json({
            'status':"1",
            "data":result,
            "message":"updated Payroll"
        })
    }).catch(err=>{
        res.status(500).json({
            'status':"0",
            "data":err,
            "message":"something went wrong"
        })
    })


})


// delete

router.delete('/delete-salary/:id',(req,res,next)=>{

    Payroll.deleteOne({_id:req.params.id}).then(result=>{
        res.status(200).json({
            'status':"1",
            "data":result,
            "message":"Payroll Delete Duccessfully"
        })
    }).catch(err=>{
        res.status(500).json({
            'status':"0",
            "data":err,
            "message":"something went wrong"
        })
    })
})


// Salary Assign

router.post('/salary-assign',(req,res,next)=>{

    const {employeeId,payrollId}  = req.body;
    if(!employeeId || !payrollId)
    {
        return res.status(200).json({
            'status':"0",
            "data":"{}",
            "message":"Please Insert All Required Fields"
        });
    }

    SalaryAssign.findOne({'employeeId':employeeId}).then(assign=>{
        if(assign)
        {
            return res.status(200).json({
                'status':"0",
                "data":"{}",
                "message":"Salary Already Assign"
            });
        }else{
            const salaryAssign = new SalaryAssign({
                _id:new mongoose.Types.ObjectId,
                employeeId:employeeId,
                payrollId:payrollId,
                

            });

            salaryAssign.save().then(result=>{
                res.status(200).json({
                    'status':"1",
                    "data":result,
                    "message":"Salary Assign Add  Successfully"
                })
            }).catch(err=>{
                res.status(500).json({
                    'status':"0",
                    "data":"{}",
                    "message":err
                })

            })
        }
    })

});
























module.exports = router;