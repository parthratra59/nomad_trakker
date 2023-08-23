const express = require("express");
const router = express.Router()

const {
    login,
    signup,
    sendOTP,
    changePassword
} = require('../controllers/Auth'); // Update the path to Auth.js

const {
    resetPasswordToken,
    resetPassword
} = require('../controllers/Resetpassword');

const {
    deleteAccount
} = require('../controllers/DeleteAccount');




// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************


// login route
router.post('/login',login)

// signup route
router.post('/signup',signup)

// Route for sending OTP to the user's email
router.post('/sendOTP',sendOTP)


// Route for Changing the password
// router.post('/changepassword',changePassword)
router.post('/changepassword/:_id', changePassword);



// ********************************************************************************************************
//                                      Reset Password routes
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)



// ********************************************************************************************************
//                                      Delete Account routes
// ********************************************************************************************************

// Route for deleting user's account
router.delete("/delete-account/:_id", deleteAccount)




module.exports = router;

