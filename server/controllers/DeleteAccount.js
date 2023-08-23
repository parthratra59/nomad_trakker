const User = require('../models/User')


    exports.deleteAccount=async(req,res)=>{
        try{

            // aise bhi toh hoskta hai
            // const id = req.params.id
        //    params.id refers to a parameter named id that is part of the URL route and is defined by default.
            const {_id} =req.params;   // Extract user's _id from URL parameter yh vo id hai jo apne app bnti hai mongodb mai

           
            const user = await User.findByIdAndDelete({_id})
            if(!user)
            {
                return res.status(400).json({
                    sucess:false,
                    message:"User not found"
                })
            }


            return res.status(200).json({
                sucess:true,
                message:"User deleted successfully"
            })



             








        }
        catch{
            return res.status(500).json({
                sucess:false,
                message:"Something went wrong while deleting user"

            })

        }
    }