const express = require("express");
const router = express.Router();

const {
  addLike,
  showAllLikedItems,
  deleteLikedItem,
} = require("../controllers/Like"); // Update the path to Profile.js

// ********************************************************************************************************
// middleware
// ********************************************************************************************************

const { authorization } = require("../middleware/authorization"); // Update the path to auth.js

// Route for updating user's profile

router.post("/addlike", authorization, addLike);

router.get("/alllikes", authorization, showAllLikedItems);

// remove like from cart
router.delete("/removelike", authorization, deleteLikedItem);

module.exports = router;
