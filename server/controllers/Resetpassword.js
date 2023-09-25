const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { mailSender } = require("../utils/mailsender");
const crypto = require("crypto");

// reset password token
// screenshots mai sb dikhya hia
// reset password token bnane ke baad reset password bnate hai
// tubhhi soch update password mai mere paas purana password the but isme purana paaasword nhi hai
// isliye token lenge
exports.resetPasswordToken = async (req, res) => {
  try {
    // full algo which we will do
    // 1.get email from req.body
    // 2. check if user exist with that email(VALIDATION KRO)
    // 3. if user found then generate a token with that user id
    // 4.upadate USER by adding token and expiration time
    // 5. create url
    // 6. send email with above url
    //7 send response

    // 1.get email from req.body

    // agr aap destructure nhi krte toh aise use krte

    // const email=req.body.email;
    // / const CheckuserPresent = await User.findOne({email:email})

    const { email } = req.body;

    // 2. check if user exist with that email(VALIDATION KRO)

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        sucess: false,
        message: `This Email: ${email} is not Registered With Us Enter a Valid Email`,
      });
    }

    // 3. if user found then generate a token with that user id

    const token = crypto.randomBytes(20).toString("hex");

    // 4. upadate USER by adding token and expiration time
    // do trh se update kr skte hai id ke basis pr ya fir email ke basis pr
    // id ke basis pr find findbyidandupdate age email ke basis pr kr rhe toh
    // findoneandupdate kr rhe hai

    // phela vala {} search ka hai aur dusra vala {} update ka hai kya update krna hai and new deta
    // hmko updated vala return mai chaiye toh new true krdo

    const user = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        tokenExpiration: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );

    // 5. create url
    // const url = `http://localhost:3000/resetpassword/${token}`;
    const url = `https://parth79.web.app/resetpassword/${token}`;

    // 6. send email with above url
    await mailSender(
      email,
      "Password Reset Link",
      `Your Link for email verification is ${url}. Please click this url to reset your password.`
    );

    //7 send response
    res.json({
      success: true,
      message:
        "Email Sent Successfully, Please Check Your Email to Continue Further",
    });
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Sending the Reset Message`,
    });
  }
};

// chalo ab mail pauch gya hai and ab reset password krte hai
// page pr redirect hota hai reset password vale
// ab na token and token expiration ka use aega jo maine abhi  User schema  mai dala hai upr

exports.resetPassword = async (req, res) => {
  try {
    //         // data fetch
    //         // data validation
    //         // get userdetails from db using token
    //         // check if token is valid or not
    //         // check if token is expired or not
    //         // check if password and confirm password are same or not
    //         // encrypt password(hashed the password)

    //         // update user password in db

    //         // send response

    // yh thoda typical hai isme token req.body se utha rha hai token and expiration time

    const { password, confirmPassword, token } = req.body;

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        sucess: false,
        message:
          "Password should contain atleast 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character",
      });
    }

    if (confirmPassword !== password) {
      return res.json({
        success: false,
        message: "Password and Confirm Password Does not Match",
      });
    }
    const userDetails = await User.findOne({ token: token });
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is Invalid",
      });
    }

    //         // check if token is expired or not
    //         // token expiration time is 5 min
    //         // let suppose 5 bje hai hai aur token expiration time 5:05 hai toh yh condition true hogi
    //         // but 5:06 ho gya toh yh condition false hogi date.now 5:06 hogya toh vo toh bda ho gya hai
    //         // toh yh condition false hogyi
    if (userDetails.resetPasswordExpires > Date.now()) {
      return res.status(403).json({
        success: false,
        message: `Token is Expired, Please Regenerate Your Token`,
      });
    }
    // 10 rounds  of hashing
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { token: token },
      { password: encryptedPassword },
      { new: true }
    );
    //         // update user password in db
    //         // phela vala {} search ka hai aur dusra vala {} update ka hai kya update krna hai and new deta
    //         // hmko updated vala return mai chaiye toh new true krdo
    res.json({
      success: true,
      message: `Password Reset Successful`,
    });
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Updating the Password`,
    });
  }
};
