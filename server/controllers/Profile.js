const User = require("../models/User");
require("dotenv").config();
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// update ke time toh toh mongodb mai _id hota hai by defalut usko isliye hm object mai daall rhe hai _id: id isliye kr rhe
exports.updateProfile = async (req, res) => {
  try {
    // get data
    const { firstName, lastName } = req.body;

    //  validation

    // jb hm autherazation use nhi krte toh aisa hota code
    // const{_id}   = req.params;
    // but hmne authorization use kiya
    // req.user isme .user toh authorization se arha
    // .user
    const id = req.user.id;
    // req.user user mai payload hai payload mai id vo leliya

    // find user
    // .save bhi ek trika h update ka but mai findbyidand update bhi use kr skte hai niche .save vala code likha  hai niche vala

    // const currentUser = await User.findById(id);

    // update profile
    // currentUser.firstName = firstName;
    // currentUser.lastName = lastName;

    // // save user
    // // do trh se hm save kr skte hai ek toh .save kr ke jb object phele se bna ho dusra await User.create({firstName,lastName}}) aise idhr hmara object bna pda upr toh hm .save vala use krege methdod
    // await currentUser.save();

    const currentUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          firstName,
          lastName,
        },
      },
      { new: true }
    );

    console.log("currentuser:-", currentUser);

    // return response
    //   aise bhi like skte hai direct currentUser  andr
    return res.status(200).json({
      sucess: true,
      message: "Profile updated successfully",
      data: currentUser,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Something went wrong while updating profile",
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    // delete account vala controller ahia usme jb hm bina authorization ke to params use krte hai
    // const id = req.params.id
    // or (params mtlb jo databse mai store hai )
    // const {_id} =req.params;   // Extract user's _id from URL parameter yh vo id hai jo apne app bnti hai mongodb mai

    // with authorization ka logic
    // logib tha toh id bhi mil gyi
    // console.log(req.user)
    const id = req.user.id;
    console.log("req.user.id:-", req.user.id);
    console.log("req.user:-",req.user)
    // console.log("req",req)

    // const {_id}=req.user yh bhi kr skte hai
    // _id mongodb mai hai
    const currentUser = await User.findById({ _id: id });
    if (!currentUser) {
      return res.status(400).json({
        sucess: false,
        message: "User not found",
      });
    }
    await currentUser.deleteOne();

    return res.status(200).json({
      sucess: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Something went wrong while deleting user",
    });
  }
};

exports.Uploadphoto = async (req, res) => {
  try {
    const id = req.user.id;
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(400).json({
        sucess: false,
        message: "User not found",
      });
    }

    // profilepciture m
    const image = req.files.profilepicture;
    if (!image) {
      return res.status(400).json({
        sucess: false,
        message: "Please Upload Image",
      });
    }
    // image hogya  and folder cloudinary pr hai
    // utils mai jo maine jo function bnaya ahi hai usme sb se important parameters yh hai

    const uploadDetails = await uploadImageToCloudinary(
      image,
      process.env.FOLDER_NAME
    );
    console.log(uploadDetails);
    //  secure_url bydefault hai thoda isme security hai
    const updatedImage = await User.findByIdAndUpdate(
      { _id: id },
      { image: uploadDetails.secure_url },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Image updated successfully",
      data: updatedImage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
