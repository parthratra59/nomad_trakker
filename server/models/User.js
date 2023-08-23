const mongoose =require('mongoose');


const UserSchema=new mongoose.Schema({

    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    image:{
        type:String,
        // required:true,
        // trim:true,
    },
    likeCart:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ],

    // reset password ke time kaam aega jb hm forget password pr click krege toh yh token generate hoga
    // aur yh token expiration time bhi generate hoga
    
    token:{
        type:String,
       

    },
    tokenExpiration:{
        type:Date,
    }


});

module.exports=mongoose.model('User',UserSchema)