const mongoose = require("mongoose");
const { mailSender } = require("../utils/mailsender");
const otpTemplate = require("../mailtemplates/emailverification");

// flow dekho phele maine otp schema bnaliya then premiddleware mai hmne verification mail ka function bnaliya jo mail sender mai jaega check udhr se mail send hoga then then otp dalne ke baad save hojaega database mai chla jaega
const Otpschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createAt: {
    // time check krne se pta lg rha kb tk valid hai
    type: Date,
    default: Date.now,
    expires: 5 * 60,
  },
});

// kis email pr bheju aur kis otp se bheju  and save hone se phele yh jarha hai na otp mail pr
// pre method use krege

const sendverificationEmail = async (email, otp) => {
  try {
    const mailresponse = await mailSender(
      email,
      "Verification Email from Nomad Trakker",
      otpTemplate(otp)
    );
    console.log("email sent successfully", mailresponse);
  } catch (err) {
    console.log("error occured while sending email");
    throw err;
  }
};

// post mai docs paas krte hai isme next kr rhe ya fir kuch nhu bhi krege toh bhi chal jaega
// docs hoga nhi because save thodi hua hai database mai
// https://mongoosejs.com/docs/middleware.html
Otpschema.pre("save", async function (next) {
  try {
    await sendverificationEmail(this.email, this.otp);
    // dono kr skte
    // await sendverificationEmail(this.email,this.otp)
    next();
    // next isliye ab ab next middleware mai move kro yh hogya hai
  } catch (err) {
    console.log("error occured while sending email");
    throw err;
  }
});

module.exports = mongoose.model("Otp", Otpschema);
