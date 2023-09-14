const express = require("express");
const router = express.Router();

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
const {
  updateProfile,
  deleteAccount,
  Uploadphoto,
  updatePassword,
} = require("../controllers/Profile"); // Update the path to Profile.js

// ********************************************************************************************************
// middleware
// ********************************************************************************************************
const { authorization } = require("../middleware/authorization"); // Update the path to auth.js

// Route for updating user's profile

router.put("/updateprofile", authorization, updateProfile);

// Route for deleting user's account
router.delete("/deleteaccount", authorization, deleteAccount);

// Route for uploading user's profile photo
router.put("/uploadphoto", authorization, Uploadphoto);

// change password
router.put("/updatepassword", authorization, updatePassword);

module.exports = router;
