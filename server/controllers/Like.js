const User = require("../models/User");
const Like = require("../models/Likemodel");
require("dotenv").config();
const { uploadImageToCloudinary } = require("../utils/imageUploader");


exports.addLike = async (req, res) => {
  try {
    const {
      itemId,
      itemName,
      websiteUrl,
      tripAdviserUrl,
      location,
      ranking,
      rating,
      contactNumber,
      reviews,
      cuisine,
    } = req.body;

    console.log("req.body", req.body);
    const thumbnail = req.files.clicks;
    console.log("thumbnail", thumbnail);

    if (!thumbnail) {
      return res.status(400).json({
        success: false,
        message: "Please Upload Image",
      });
    }

    const userId = req.user.id;
    console.log("req.user.id", userId);
    const userDetails = await User.findById(userId);
    console.log("userDetails", userDetails);

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // upload image to cloudinary
    // first parameter file name jo upr likhi hai
    const uploadDetails = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME1
    );
    // console.log("uploadDetails", uploadDetails);

    // create an entry for item in database

    const newItem = await Like.create({
      itemId,
      itemImage:uploadDetails.secure_url,
      itemName,
      websiteUrl,
      tripAdviserUrl,
      location,
      ranking,
      rating,
      contactNumber,
      reviews,
      cuisine

    });
    console.log("newItem", newItem);

    // add item to user's liked items array tbhi toh user ke liked/wishlist dikhegi items mei show hoga

    // phela parameter vo hai ki yh id mil jae 2nd mai kya add krna hai third update vali chij dikhani  hai

    // $set: This operator is used to update the value of a field or multiple fields in a document. It can be used to modify existing fields or add new fields to a document. When you use $set, it replaces the existing value of a field with a new value. If the field does not exist, it creates the field.

    // $push: This operator is used to add an element to an array field in a document. It does not replace the entire array; instead, it appends a new element to the existing array. If the array field does not exist, $push will create the array and then add the element to it
    await User.findByIdAndUpdate(
      { _id: userId },
      {
        $push: {
          likeCart: newItem._id,
        },
      },
      console.log("newItem.itjjemId", newItem.itemId),
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Item added to liked items",
      data: newItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while adding item to liked items",
    });
  }
};

exports.showAllLikedItems = async (req, res) => {
  try {
    const allitems = await Like.find({});
    return res.status(200).json({
      success: true,
      message: "All liked items fetched successfully",
      data: allitems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching liked items",
      error: error.message,
    });
  }
};

// delete elements from the User cart

exports.deleteLikedItem = async (req, res) => {
  try {
    // User ke andr ek array hai cart ka jisme sare items hai usme item is hai toh kee milegi
    // console.log("req.body1", req.body);
    // 3 ways hai id nikalne ke
    // const id= req.body.id;    // const {id}=req.body;  //const {_id} =req.body;
    // apdono kr skte hai id and _id/id destructure kuch bhi use kr skte hai 
    // but mai _id use kr rha muje jyda 
    const { _id } = req.body;
    
    console.log("req.body", req.body);

    // idhr destructure krlia hai toh bracket mai krne ki need nhi hai
    
    const deleteItem = await Like.findByIdAndDelete(_id)

    if (!deleteItem) {
      // If the item is not found in the database
      return res.status(404).json({
        success: false,
        message: "Item not found in the liked items",
      });
    }

    // delete item from user's module
    
    const userId = req.user.id;
    // middleware vale function se id mil jati hai  


    // phele maine vo user ki id nikali then pull mai jakr liked cart se usme _id hogi item ki uda do 
    console.log("req.user.id", req.user.id);
    const removeElement = await User.findByIdAndUpdate(
       userId ,
      {
        $pull: {
          likeCart: _id,
        },
      },
      console.log("kasturi", _id),
      {
        new: true,
      }
    );

      console.log("delete from the User also", removeElement)
    



    // delete item from cart
    //     1.findByIdAndDelete deletes the entire document. means all fields of an array
    // 2.$pull with findByIdAndUpdate modifies a specific field (in this case, an array) within the document without deleting the entire document.
 
    // console.log("removeElement", removeElement);

  




    return res.status(200).json({
      success: true,
      message: "Item removed from the liked items",
      data: deleteItem,

    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while removing item from liked items",
      error: error.message,
    });
  }
};
