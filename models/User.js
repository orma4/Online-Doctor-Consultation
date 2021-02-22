const crypto = require("crypto");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const userSchema = new Schema ({
    name: {
       type: String,
       required: true  
    },
    date: {
        type: Date,
        default: Date.now
    },

     email: {
        type: String,
        required: true,
        unique: true
     },

     password: {
        type: String,
        required: true  
     },

     userType: {
        type: String,
        required: true
     },

     isFirstTime: {
        type: Boolean,
        required: false
     },

     isApproved: {
        type: Boolean,
        required: false

     },
     phone: {
      type: String
     },
     image: {
      type: String
     },
     recommendations: {
      type: Number
     },
     resetPasswordToken: String,
     resetPasswordExpire: Date,
});
userSchema.methods.getSignedJwtToken = function () {
   console.log("secret:", process.env.jwtSecret)
   console.log("expire:", process.env.JWT_EXPIRE)

   return jwt.sign({ id: this._id }, process.env.jwtSecret, {
     expiresIn: process.env.JWT_EXPIRE,
   });
 };
userSchema.methods.getResetPasswordToken = function () {
   const resetToken = crypto.randomBytes(20).toString("hex");
 
   // Hash token (private key) and save to database
   this.resetPasswordToken = crypto
     .createHash("sha256")
     .update(resetToken)
     .digest("hex");
 
   // Set token expire date
   this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes
 
   return resetToken;
 };

module.exports = user = mongoose.model('user', userSchema);