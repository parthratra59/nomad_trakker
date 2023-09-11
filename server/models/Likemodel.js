const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema(
  {
    itemId: {
      type: String,
      // required: true,
      trim: true,
    },
    itemImage: {
      type: String,
      // required: true,
      trim: true,
    },
  
    itemName: {
      type: String,
      // required: true,
      trim: true,
    },
    websiteUrl: {
      type: String,
      // required: true,
      trim: true,
    },
    tripAdviserUrl: {
      type: String,
      // required: true,
      trim: true,
    },
    location: {
      type: String,
      // required: true,
      trim:true,
    },
    ranking: {
      type: String,
      // required: true,
      trim: true,
    },
    rating: {
      type: String,
      // required: true,
      trim: true,
    },
    contactNumber: {
      type: String,
      // required: true,
      trim: true,
    },
    cuisine: [
      {
        type:String,
      
        trim:true,
      },
    ],
    reviews:{
      type:String,
      
      trim:true,
    }
  },
  { timestamps: true }

  // timestamp se creatreat and updated at ata  hai
);

module.exports = mongoose.model("Like", LikeSchema);
