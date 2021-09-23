const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const admin_user = require('../model/admin_user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const helper = require('../../helper/helper');





router.post('/signup',(req,res,next)=>{

    const {username,email,phone,password}  = req.body;
    if(!username || !email || !phone || !password)
    {
        return res.status(422).json({
            'success':false,
            "data":"{}",
            "message":"Please Insert All Required Fields"
        })
    }



   var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   if (!re.test(req.body.email)) {

        return res.status(422).json({
                        'success':false,
                        "data":"{}",
                        "message":"invalid Email Format!"
        });


   } else {

     var re = /^(\+\d{1,3}[- ]?)?\d{9}$/;
     if (!re.test(req.body.phone)) {
       return res.status(422).json({
            'success':false,
            "data":"{}",
            "message":"invalid Mobile Number!"
            });
        }
   }


 bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err)
        {
            return res.status(500).json({
                error:err
            })
        }else{
    

            // check phone exist or not
           admin_user.findOne({$or:[{"email":req.body.email},{"phone":req.body.phone}]}).then(adminuser=>{
            if(adminuser)
            {
                return res.status(422).json({
                    'success':false,
                    "data":"{}",
                    "message":"Email Or Phone Number Already Exist"
                })
            }else{

                    const adminUser = new admin_user({
                        _id:new mongoose.Types.ObjectId,
                        username:req.body.username,
                        email:req.body.email,
                        phone:req.body.phone,
                        password:hash,
                        role:"admin",
                        status:"1"
                    });
        
                    adminUser.save()
                    .then(result=>{
                        res.status(200).json({
                            'success':true,
                            "data":result,
                            "message":"Register Successfully"
                        })
                    }).catch(err=>{
                        res.status(500).json({
                            error:err
                        })
                    })

            }
        });

    
        }


    })
});

router.post('/login',(req,res,next)=>{
    const {email,password} = req.body;

    admin_user.findOne({email:email})
    .exec()
    .then(user=>{
        
        if(user.length < 1)
        {
            return res.status(401).json({
                'success':false,
                "data":"{}",
                'message':"Invalid user"
            })
        }

        bcrypt.compare(password,user.password,(err,result)=>{
            if(!result)
            {
                return res.status(401).json({
                    'status':"0",
                    "data":"{}",
                    'message':"Password Does Not Match!"
                });
                
            }

            if(result)
            {
                const token = jwt.sign({
                    _id:user._id,
                    username:user.username,
                    email:user.email,
                    phone:user.phone,
                    role:user.role,
                    status:user.status
                },
                    'this is dummy text',
                    {
                        expiresIn:'24h'
                    }
                );

                const data = ({
                    _id:user._id,
                    username:user.username,
                    email:user.email,
                    phone:user.phone,
                    role:user.role,
                    status:user.status,
                    token:token
                })

                return res.status(200).json({
                    'success':true,
                    "data":data,
                    "message":"Login  Successfully"
                })
            }

        })
    }).catch(err=>{
        res.status(500).json({
            'success':false,
            "data":"{}",
            "message":"sometning went wrong"
        })
    })

})

// forgot password

router.post('/forgot-password',(req,res,next)=>{


    const {email} = req.body;
    if(!email)
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

    admin_user.findOne({'email':email}).then(result=>{
        if(result)
        {
            const otp = helper.createOtp(5);
            admin_user.findOneAndUpdate({'email':email},{
                $set:{
                    otp:otp
                }
            }).then(result=>{
                // for send email
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'vikku1992@gmail.com',
                      pass: 'mailvikas4u$'
                    }
                  });
    
                  const  mailOptions = {
                    from: 'vikku1992@gmail.com',
                    to: email,
                    subject: 'OTP',
                    text: otp
                    // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
                  };
            
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });

                return res.status(200).json({
                    'status':"1",
                    "data":otp,
                    "message":"Otp sent to your email id"
                })
            }).catch(err=>{
                return res.status(200).json({
                    'status':"0",
                    "data":err,
                    "message":"Something Went Wrong"
                })
            })

          




        }
    })

 

   


 

   


     

      


    


})

router.post('/otp-match',(req,res,next)=>{

    const {otp,email} = req.body;
    if(!otp || !email)
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


    admin_user.findOne({'email':email}).then(result=>{
        if(result)
        {
            if(otp == result.otp)
            {
                return res.status(200).json({
                    'status':"1",
                    "data":'{}',
                    "message":"Otp Match Successfully"
                })
            }else{
                return res.status(200).json({
                    'status':"0",
                    "data":'{}',
                    "message":"Otp Does Not Match"
                })
            }
            
        }
    })

 

    


})


router.post('/change-password',(req,res,next)=>{

    const {email,password,cpassword} = req.body;
    if(!password || !email || !cpassword)
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


    admin_user.findOne({'email':email}).then(result=>{
        if(result)
        {
            if(password == cpassword)
            {
              

                    bcrypt.hash(password,10,(err,hash)=>{
                        if(err)
                        {
                            return res.status(200).json({
                                'status':"0",
                                "data":err,
                                "message":"Something went wrong"
                            })
                        }else{
                            admin_user.findOneAndUpdate({'email':email},{
                                $set:{
                                    password:hash
                                }
                            }).then(result=>{
                                return res.status(200).json({
                                    'status':"1",
                                    "data":'{}',
                                    "message":"Passwod Has been changed"
                                })
                            }).catch(err=>{
                                return res.status(200).json({
                                    'status':"0",
                                    "data":err,
                                    "message":"Something Went Wrong"
                                })
                            })
                        }
                    })
               
            }else{
                return res.status(200).json({
                    'status':"0",
                    "data":'{}',
                    "message":"Password and confirm password Does not match"
                })
            }
            
        }
    })

 

    


})










module.exports = router;