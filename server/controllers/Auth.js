// maine .save and .create kb use krte kya differnce haui flowmodel mai likh diya hai
const User = require("../models/User");
const OTP = require("../models/OTP");
const otpgenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { mailSender } = require("../utils/mailsender");
// send otp
// phele toh sendOTP ka function call krna hota hai fir vo otp generate krta hai fir vo otp ko mail mai send krta hai fir vo otp ke database se email nikalte hai
exports.sendOTP = async (req, res) => {
  try {
    // sbse phele req ke body se email nikal lunga
    // req body mtlb client side vali
    const { email } = req.body;

    // validate kro
    if (!email) {
      return res.status(403).json({
        success: false,
        message: "Email is required",
      });
    }

    // regex se valid kro more validation bdao
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      return res.status(403).json({
        success: false,
        message:
          "Invalid email format. Please provide a valid email address in the format user@example.com.",
      });
    }
    // check if user already exist
    // console.log("parth")

    // jb destructure nhi krte na toh aise use krna pdta

    // const email=req.body.email;
    // agr hmne yh kitya toh aisa hoga because destructure nhi kiya
    // const checkPresent= await User.findOne({email:email})
    // check kro USer model mai ki email exist krta hai ki nhi

    const CheckuserPresent = await User.findOne({ email });

    // if checkuser true agya toh valid res send krdunga kuki findOne bool value deta hai
    if (CheckuserPresent) {
      return res.status(401).json({
        sucess: false,
        message: "User Already exist",
      });
    }

    // agr nhi kiya toh otpgenerator vala package install kro then  and import krao
    // generate otp

    let otp = otpgenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    console.log("otp generator", otp);

    // check otp is unique or not
    let result = await OTP.findOne({ otp: otp });
    // agr usko mil gya db mai aisa otp
    // toh hm jb generate hone ke baad bhi kya pta aiasa otp phele kbhi db mai aya ho
    // toh hm jb tk code generate krege ki jb tk koi nya nhi mil jae
    // unique otp nhi mil jata tb tk krege generate hojae
    while (result) {
      let otp = otpgenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      // hr baar check kr rha hu phele se toh exist nhi krta tha agr yh false aya tb hi loop se niklega
      result = await OTP.findOne({ otp: otp });
    }

    // chaalo ab hmne unique otp generate krlia
    // otp model se hm otp,email magvalete hai
    // ek doubt? created at bhi toh hai udhr vo bhi mangwwate hai na
    // need nhi agr nhi mnagwaye toh abhi vale time ko by default mnalega
    const otpPayload = { email, otp };

    // const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    // otppayload database mai gya and and fir udhr sendotpverification mail run hua
    console.log("OTP Body", otpBody);

    // create an entry of OTP
    // ab hm yh sb chij otp vale model mai bhej dege
    // like avgxfe hmne otp bheja db mai us bnde ke liye aur mail pr avgxfe gya
    // then bnda website pr dalega vo bhi toh check krna us db ke otp se weather
    // it is true or false

    res.status(200).json({
      success: "true",
      message: "OTP send successfully",
      otp: otp,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      sucess: false,
      message: error.message,
    });
  }
};

exports.signup = async (req, res) => {
  try {
    // fetch kro data
    // otp mai otp vala jb page on hua hoga udhr se utha rha
    // req body mtlb client side vali

    // jb aise likh dete na object alg then .create use krskte
    const { firstName, lastName, email, password, confirmPassword, otp } =
      req.body;

    // validate kro
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    

    // 2 password match krna
    if (password !== confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "Password and confirm password does not match",
      });
    }

    // chalo vo bhi match hogya
    // /chalo  ab check kro ki user exist krta hai ki nhi krta phele se

    // agr krta hia toh error throw kro

    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(403).json({
        sucess: false,
        message: "User is already registered",
      });
    }

    // ab otp validate kro most recent vali se chaiye  otp because agr recent nhi li toh
    // phlei vali se toh check ho hi nhi paegi

    // hm ne jo likhi hai usko recentotp se match krege agr same hogyi toh badiya
    // vrna res error

    // In the context of sorting in databases, the value -1 represents descending order. When you use -1 as a sorting value, it instructs the database to arrange the records in reverse chronological order.

    // 1 would represent ascending order (oldest to newest).
    // -1 represents descending order (newest to oldest).
    // So, when you see .sort({ createdAt: -1 }), it's telling the database to sort the records by the createdAt field in descending order, placing the newest records at the beginning of the result set.

    // limit(1) means most recent ke 1 hi chaiye
    // limit(2) means most recent ke 2 hi chaiye return mai

    // recent otp pe jo mail aya hoga vo hai usko find kro
    const recentotp = await OTP.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(recentotp);
    // validate otp
    if (recentotp.length === 0) {
      // otp not found
      return res.status(400).json({
        success: false,
        message: "OTP NOT VALID",
      });
    }
    // reason->
    else if (recentotp.otp !== otp) {
      // invalid otp
      return res.status(400).json({
        success: false,
        message: "INVALID OTP",
      });
    }

    // chalo otp valid hogya
    // ab passsword hash kro
    // 10 rounds chalao
    const hashedpassword = await bcrypt.hash(password, 10);

    // entry  create in db
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedpassword,
      image: `https://api.dicebear.com/6.x/initials/svg?seed=${firstName} ${lastName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`,
    });

    // arrey yh krega ki jaisi hi check hue/validate hue toh delete krde otp ko db se kuki OTP se hi arha tha na OTP vale module se isliye USer se nhi kiya ab delete hogya toh ab immedeiate delete krke account bnaunga toh new otp vala jo user mai gya hai us se validate hoga

    const parth =await OTP.findOneAndDelete({ _id: recentotp._id });
    console.log("autbhhia",parth)

    return res.status(200).json({
      // screenupscreen shot mai dekho iska example hai
      // firstname,lastname,email,password,confirm password hm signup vale page se lerhe hai
      // and otp hm otp vale page se lerhe hai
      // isliye toh req.body means client side se yh aya
      success: true,
      message: "User created successfully",
      user,
    });

    // check kro phele se hai ki nhi
    // agr nhi hai toh 2 password check kro
    // check
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "User not created successfully, please try again",
    });
  }
};

// login

exports.login = async (req, res) => {
  try {
    // fetch krege req body se
    // req body mtlb client side vali

    const { email, password } = req.body;

    // validate kro

    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check kro user exist krta hai ki nhi

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User is not registered , please signup first",
      });
    }

    // check kro password match krta hai ki nhi
    // compare kro bcrypt ke compare function se
    // compare mai 2 argument pass krte hai
    // 1st jo user input mai hai
    // 2nd jo db mai hai

    // agr match krta hai toh token generate kro
    // sb explanation hai authbackend github mai hai udhr hr chij btai hai maine

    const payLoad = {
      email: user.email,
      id: user._id,
    };

    if (await bcrypt.compare(password, user.password)) {
      //    password correct hogya toh login krege
      // create kro token
      let token = jwt.sign(payLoad, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      user.token = token;
      console.log(user);
      user.password = undefined;
      console.log(user);

      // chalo ab cookie generate krte hai
      // cookie ke andr 3 paramter insert krne pdte hai
      // cookie name,cookie data,options jo hm banege
      // jo name idhr rkge usi se fronend maai bulana pdeaga
      // agr ratraparth hai toh frontend mai bhi ratraparth se bulana pdega
      // res.cookie("ratraparth",token,options).status(200).
      // isliye token rhk do vo convention bhi hai

      const options = {
        // 10year mai kya hoga  10 * 365 days* 24hours*60 min *60 sec*1000miilisec
        expires: new Date(Date.now() + 10 * 24 * 365 * 60 * 60 * 1000),
        httpOnly: true,
        // it means koi bhi bnda isme changes client side se nhi kr skta
      };

      //   aise bhi like skte hai data:existingUser andr
      return res.cookie("token", token, options).status(200).json({
        success: true,
        message: "User logged in successfully",
        user,
        token,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "login failure",
    });
  }
};

