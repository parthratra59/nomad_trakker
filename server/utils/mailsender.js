const nodemailer = require("nodemailer")
require('dotenv').config()


// mailsender isliye bnaya otp ko mail mai send kr pau otp vale model mai jakr hm likhege ki jb otp generate ho toh yh function call ho jaye same concept nodemailer vale concept mai sikh kr aye hai
    exports.mailSender=async(email,title,body)=>{
    try{
            // mujhe sbse phele transporter likhna pdta
            // createTransport vale inbuilt functionse nodemailer ke
            // https://www.w3schools.com/nodejs/nodejs_email.asp isme sb hai
            let transporter=nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                auth:{
                    user:process.env.MAIL_USER,
                    pass:process.env.MAIL_PASS,

                }
            }) 


            let info = await transporter.sendMail({
                from:`"NOMAD_TRAKKER" ${process.env.MAIL_USER}`,
                // jo abhi imput mai email arha hai argument mai yh vohi kaam hai hm util mai kr rhe hai

                to:`${email}`,
                subject:`${title}`,
                // html likhege tbhi html apaega
                html:`${body}`,
               
            })


            console.log(info)
            console.log("Message sent: %s", info)
    }
    catch(error){
        console.log(error.message)
    }
}



