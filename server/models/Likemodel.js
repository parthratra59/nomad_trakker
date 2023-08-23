const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({

    itemid:{
        type:String,
        required:true
    },
    itemimage:{
        type:String,
        required:true
    },
    itemname:{
        type:String,
        required:true
    },
    websiteurl:{
        type:String,
        required:true
    },
    tripadviserurl:{
        type:String,
        required:true
    }, 
    location:{
        type:String,
        required:true
    },
    ranking:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    contactnumber:{
        type:Number,
        required:true
    },
    cusine:[
        {
            type:String,
            required:true

        }
    ],
    
    }
    ,{timestamps:true

});

module.exports=mongoose.model('Like',LikeSchema);