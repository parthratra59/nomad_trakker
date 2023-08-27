
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// intial state mai token se lunga agr hogi toh agr nhi hogi toh daldunga
// bina local staoarge ke bhi chlega usme initial state mai null daldo
// jb tk data nhi aya hoga loading hota rhega backend se data arha hai toh loading true hoga
const initialState ={
  // localstorage ami "token" by default hai agr token ki baat kre cookie jaisa nhi hai ki same name rhkna
    // token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")):null,
    // using cookies also
    // name hai "token" jis name se backend mai name rhka hoga usi name se idhr bulaege agr udhr parth hota toh parth likhte
    // token mila toh thik nhi toh null
    // cookies se aise kr skte hai localStorage se bhi kr skte hai jo upr kr rha hu
    // token:Cookies.get("token") || null,


    // chlo dono se krte hai
      // what is parsing here's the answer
    //Yes, you're close! Parsing in this context means converting the JSON-formatted string into the corresponding data types in the programming language. JSON (JavaScript Object Notation) is a text-based data interchange format, and when you parse a JSON string, you're essentially transforming it into the appropriate data structures and types that can be used within your programming language.

// For example, if you have a JSON string like {"name": "John", "age": 30}, after parsing it using JSON.parse(), you would get a JavaScript object with properties name and age, and their corresponding string and number values. So, parsing converts the raw string representation of data into actual usable data types within your programming language.

// if main sirf cookie use kr rha hota toh parse krna pdata tb bhi jb bhi hm json ke sath kaam kr rhe hote hai toh parse krna pdta hai
// agr hmne local storage use kiya toh parse krna pdta hai
// hme cookie mai parse nhi krna pdata
// explanation:-
// . When you store data in cookies, you typically store it as a string. If you're storing a JSON Web Token (JWT) or any other string data in cookies, you don't need to parse it with JSON.parse when retrieving it. You can directly retrieve the string value from cookies using Cookies.get("key").


// Cookies are a way to store small pieces of data, typically as simple key-value pairs, on the client's browser. When you use a library like js-cookie to set a cookie, you are providing the library with a value that will be stored as a string. Cookies are sent between the client and the server as strings, and the server usually sets them as strings as well


// localstorage mai need hoti hai parse krne ki

// but bugs lata yh sb toh ek chij use kro




// code local storage hta do cookies se kr rhe hai vo bbhi vohi kaam faltu mai bugs aye 

// token:Cookies.get("token") || null,
token:localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")):null,

     signupData: null,
  loading: false,
}

const authSlice =createSlice({
  // progress slice mai bhaut hiacha explanation hai redux ka
    name:"auth",
    initialState: initialState,
    reducers:{
        setSignupData:(state, value)=> {
            state.signupData = value.payload;
            console.log(state.signupData);
          },
          setLoading:(state, value)=> {
            state.loading = value.payload;
          },
        setToken:(state,value)=>{
            state.token=value.payload
            console.log("Updated state with token:", state);
            // set vala kaam mai auth.js mai kr diya hai expires vgrh kb hoga sb daal diya hai
            // cookies set accept 3 para 
            // Cookies.set("token",value.payload,{expires:10 * 365 * 24 * 60 * 60 * 1000})

           
        },
        
    }
});

export const {setToken,setLoading,setSignupData,setUser}=authSlice.actions;
export default authSlice.reducer;
