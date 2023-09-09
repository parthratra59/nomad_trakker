import { toast } from "react-hot-toast";

import { useDispatch } from "react-redux";
import { add, remove } from "../../redux/slices/Likeslice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setUser } from "../../redux/slices/Profileslice";
import { apiConnector } from "../apiconnector";
import {cartEndpoints} from "../apiservice"

const {ADD_TO_CART_API,REMOVE_FROM_CART_API} = cartEndpoints

export const addTocartdb= async(hello,tokenpara)=>{
    console.log("durgamata",tokenpara)
    

    try{
        // /image append hokar hota hai formdata mai
        // formadata postman mai use krte na photos ke liye isliye use hota
        const formdata = new FormData();
        console.log("clicks",hello.photo.images.large.url)
        formdata.append("clicks",hello.photo.images.large.url)
        const cuisines = hello.cuisine ? hello.cuisine.map((item) => item.name):[];
        console.log("cuisines",cuisines)
        // The map function is used in the code to transform an array of objects into an array of a specific property from those objects. In this case, it's used to extract the name field from each object in the hello.cuisine array.
        //output-> ["Italian", "Chinese", "Indian"]

    const response = await apiConnector("POST", ADD_TO_CART_API,{
        itemId:hello.location_id,
        itemName:hello.name,
        websiteUrl:hello.website?hello.website:"",
        tripAdviserUrl:hello.web_url?hello.web_url:"",
        location:hello.address,
        ranking:hello.ranking ? hello.ranking.replace(/#/g, "") : "",
        rating:hello.rating ? hello.rating : "",
        contactNumber:hello.phone?hello.phone:"",
        cuisine: cuisines,
        reviews:hello.num_reviews?hello.num_reviews:"",
        formdata
      
    } ,{
        Authorisation: `Bearer ${tokenpara}`,
    })
    console.log("ktyabaa",response.data)
    console.log("SENDING_DATA_TO_CART API RESPONSE............", response);
    
    
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Item added to cart");


    
}
catch(error){
    console.log(error)
    console.log("SENDING_DATA_TO_CART............", error);
    toast.error(error.response.data.message);
}
}

