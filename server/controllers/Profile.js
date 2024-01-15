const User = require("../models/User");
require("dotenv").config();
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const bcrypt = require("bcryptjs");

const { mailSender } = require("../utils/mailsender");
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

    // update profile aise dalege jo aya frontend se vo update hojaega then save krna hoga .save se krdege
    // phele hm id se nikage se then update krge then save krge

    // currentUser.firstName = firstName;
    // currentUser.lastName = lastName;
    // await currentUser.save();
    // //

    // nhin toh direct .create kr ke kr do isme jrurt nhi alg se ek obj bnake ek .save kro toh direct use krdege
    // // do trh se hm save kr skte hai ek toh .save kr ke jb object phele se bna ho dusra await User.create({firstName,lastName}}) aur isme hme kisi mai dalna bhhi nhi hota alg object mai hm toh destructure krke direct .create mai daaal skte

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
      success: true,
      message: "Profile updated successfully",
      data: currentUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
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

      // jha khi bhi req.user user variable hai jo middleware mai bnaya hia toh uska use horha hota hai 
      // authorize hoga toh isliye best yh hai ki req.user se nikale 
    
    // with authorization ka logic
    // logib tha toh id bhi mil gyi
    // console.log(req.user)
    const id = req.user.id;
    console.log("req.user.id:-", req.user.id);
    console.log("req.user:-", req.user);
    // console.log("req",req)

    // const {_id}=req.user yh bhi kr skte hai
    // _id mongodb mai hai
    const currentUser = await User.findById({ _id: id });
    if (!currentUser) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    await currentUser.deleteOne();

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
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
        success: false,
        message: "User not found",
      });
    }

    // profilepciture
    // same idhr jo rhka hai cohi frontend mai hona chaiye name "profilepic" se
    // here files is middleware jo hm ne express file upload use kiya hai usme se hai req.files
    // https://www.npmjs.com/package/express-fileupload mai hai sb
    const image = req.files.profilepic;
    if (!image) {
      return res.status(400).json({
        success: false,
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

    // aisa hai
    // res.data would refer to the entire JSON object, which includes the success, message, and data properties.

    // {
    //   "success": true,
    //   "message": "Image updated successfully",
    //   "data": {
    //     "image": "https://example.com/image.jpg"
    //   }
    // }

    // jo hm front end mai krte na response.data bla bla it means hme server se yh response mil rha upr hm req.body hme reqest arhi hai aur jb frontend pr res likte means backendse yh response arha hai
    // res stands for "response," which is an object that represents the HTTP response that the server will send back to the client.

    // res.data mtlb yh niche vale sb json mai vo chije then res.data.data jo 3rd number pr hai then updated image khud ek object hai
    // data:{
    //   { _id: id },
    //   { image: uploadDetails.secure_url },
    //   { new: true }
    // }

    // aisa hia yh toh res.data.data.image

    res.status(200).json({
      success: true,
      message: "Image updated successfully",
      data: updatedImage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Image not Found",
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    // database mai jo id hai vo lo udhr se hm niche password nikalege
    // dekh mai yh use kr rha it means mai abhi login hu and  ek bnda jb login hoga us ke assosiated upr url mai id arhi hogi mai vo by defalut id ho toh mai usko fetch kr rha params se then ab mai ab User.findone krke sab kuch details nikal lunga is id ki
    // hm aise bhi kr skte
    // const id = req.params.id
    // _id jyada shi hai kuki mongomai by default bn ta hai
    // const { _id } = req.params;
    // fetch krege req body se

    // authorization se kr rha hu bina us ke bhi kr skte hia
    const id = req.user.id;

    // req body mtlb client side vali
    // req ki body mai se mtlb frontend mai field se jo arha hai data
    // email se bhi ho skta hai but mai id se kr rha hu aur yh chala kr dekh bhi liya maine
    // const {email,oldPassword,newPassword,confirmPassword}=req.body
    const { oldPassword, newPassword } = req.body;

    // validate kro

    // if(!email||!oldPassword || !newPassword || !confirmPassword)

    if (!oldPassword || !newPassword) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    //  isme hm check krke krege ky ki vo existing hai ki nhi hmare paas old password hai iska
    // mtlb yhi hojata vo existing user hia

    // const userDetails = await User.findOne({email});/

    // ab hm id se kr rhe hai
    // destructuring thodi hogi user mai userid ke name se thodi kuch hai jo
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      // userdetails se password nikal rhe hai jo db mai hai usko match krege kl ke din old password jo mai abhi likh rha hu hi match nhi kr rha aisa nhi hona chiye na decrpyt krke match kr rhe hai
      userDetails.password
    );

    if (!isPasswordMatch) {
      return res.status(403).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    // validate new password
    // regex vgrh frontend mai kr rha hu idhr jrurt nhi hai ek jgh kr te hia

    // Match new password and confirm new password

    // chalo dono ab match kr gye isko hash kro

    const encryptedPassword = await bcrypt.hash(newPassword, 10);

    // update user's password

    const updatedUser = await User.findOneAndUpdate(
      // {email:email},
      { _id: id },
      { password: encryptedPassword },
      { new: true }
    );

    // send notification mail

    // send mail to user
    await mailSender(
      updatedUser.email,
      "Password Updated Successfully",
      `Password updated successfully for ${userDetails.firstName} ${userDetails.lastName}`
    );

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "password change failure",
    });
  }
};
