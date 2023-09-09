const express = require("express");
const router = express.Router();

const {
    addLike,
    showAllLikedItems,
    deleteLikedItem 
}= require("../controllers/Like"); // Update the path to Profile.js


// ********************************************************************************************************
// middleware
// ********************************************************************************************************

const { authorization } = require("../middleware/authorization"); // Update the path to auth.js

// Route for updating user's profile


router.post("/addlike", authorization, addLike);

router.get("/showalllikeditems", authorization, showAllLikedItems);


// remove like from cart
router.put("/removelike/:itemId", authorization, deleteLikedItem);

module.exports = router;        