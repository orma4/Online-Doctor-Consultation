const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

// User model
const User = require('../../models/User');
require('dotenv/config')
// const { getResetRequest, createResetRequest } = require("../../models/resetRequests");
// const sendResetLink = require("../../models/sendEmail");

const nodemailer = require("nodemailer");

const sendEmail = (options) => {
//    var smtpConfig = {
//       host: 'smtp.gmail.com',
//       port: 465,
//       secure: true, // use SSL
//       auth: {
//           user: process.env.EMAIL_USERNAME,
//           pass: process.env.EMAIL_PASSWORD
//       }
//   };
//   var transporter = nodemailer.createTransport(smtpConfig);
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;




// @desc    Forgot Password Initialization
router.post("/forgotpassword",async (req, res, next) => {
   // Send Email to email provided but first check if user exists
   const { email } = req.body;
 
   try {
     const user = await User.findOne({ email });
 
     if (!user) {
       return next(new ErrorResponse("No email could not be sent", 404));
     }
     console.log(user)
     // Reset Token Gen and add to database hashed (private) version of token
     const resetToken = user.getResetPasswordToken();
 
     await user.save();
 
     // Create reset url to email to provided email
     const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
 
     // HTML Message
     const message = `
       <h1>You have requested a password reset</h1>
       <p>Please make a put request to the following link:</p>
       <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
     `;
 
     try {
       await sendEmail({
         to: user.email,
         subject: "Password Reset Request",
         text: message,
       });
 
       res.status(200).json({ success: true, data: "Email Sent" });
     } catch (err) {
       console.log(err);
 
       user.resetPasswordToken = undefined;
       user.resetPasswordExpire = undefined;
 
       await user.save();
 
       return next(new ErrorResponse("Email could not be sent", 500));
     }
   } catch (err) {
     next(err);
   }
 })

// @desc    Reset User Password
router.put("/passwordreset/:resetToken", async (req, res, next) => {
   // Compare token in URL params to hashed token
   const resetPasswordToken = crypto
     .createHash("sha256")
     .update(req.params.resetToken)
     .digest("hex");
 
   try {
     const user = await User.findOne({
       resetPasswordToken,
       resetPasswordExpire: { $gt: Date.now() },
     });
 
     if (!user) {
       return next(new ErrorResponse("Invalid Token", 400));
     }
 

     bcrypt.genSalt(10,async(err,salt) => {
      bcrypt.hash( req.body.password, salt,async (err,hash) => {
         if (err) throw err;
         user.password = hash;
     user.resetPasswordToken = undefined;
     user.resetPasswordExpire = undefined;
 
     await user.save();
      })})
     res.status(201).json({
       success: true,
       data: "Password Updated Success",
       token: user.getSignedJwtToken(),
     });
   } catch (err) {
     next(err);
   }
 });




 
// router.post("/forgot", (req, res) => {
   
//    User.findOne({email:req.body.email})
//    .then(user => {
//       if(!user) 
//          return res.status(400).json({msg: 'User already not exists'});
//       else
//       {
         
//        const id = uuid();
//        const request = {
//            id,
//            email: user.email,
//        };
//        console.log(request.id)

//        createResetRequest(request);
//        sendResetLink(user.email, id);
//    res.status(200).json("ok!!");
//       }
//    // const thisUser = getUser(req.body.email);
//    console.log('this')
   
// });
// });
// @route           POST api/users
// @description:    register new user
//@access           public
router.post('/', (req,res) => {
   const{ name, email, password, userType, isFirstTime, isApproved, phone, image, recommendations} = req.body;

   //Validation
   if (!name || !email || !password) {
      return res.status(400).json({msg: 'Please enter all fields'});
   }

   //Check for existing user
   User.findOne({ email })
   .then(user => {
      if(user) return res.status(400).json({msg: 'User already exists'});
      
  
      const newUser = new User({
         name,
         email,
         password,
         userType,
         isFirstTime,
         isApproved, 
         phone,
         image,
         recommendations
      });
      
      //Create Salt & Hash
      bcrypt.genSalt(10,(err,salt) => {
         bcrypt.hash(newUser.password, salt, (err,hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
            .then(user => {

               jwt.sign(
                  {id: user.id},
                  process.env.jwtSecret || config.get('jwtSecret'),
                  {expiresIn: 3600},            //OPTIONAL!!!!!
                  (err,token) => {
                     if(err) throw err;
                     res.json({
                        token: token,
                        user: {
                           id: user.id,
                           name: user.name,
                           email: user.email,
                           userType: user.userType,
                           isFirstTime: user.isFirstTime,
                           isApproved: user.isApproved, 
                           phone: user.phone,
                           image: user.image,
                           recommendations: user.recommendations
                        }
                     });
                  }
               )

              
            });
         });
      });
   });
});


module.exports = router;