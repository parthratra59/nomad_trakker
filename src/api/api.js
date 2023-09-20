import axios from "axios";

// yh ek java script function hai toh isme yh sb hook kaise chlege yh thodi react component hai
// import { useContext } from 'react';
// import { GlobalContext } from '../App';

const Getplacesdata = async (type, sw, ne) => {
  // phele sw ne paaas nhi kiya tha maine toh static value chla rha tha ab mai paas krdiya hia toh uske accordingly kaam krege
  try {
    // const data se destructure kiya api se data arha phela vala
    // varible-> same use krte jaisa api mai hai vesa hi same likhte mai same use krte
    // agr destructure nhi krege toh status,data,paging vgrh sab ajaeaga hmko data se mtlb
    // simple destructure  krege toh hm andr nhi pauch paoge andr jb apko andr jana hoto
    // simple data bs bhar bhar se dikhadega but aur destructure andr vala data ke liye aur distructure ko
    // tbhi ap place vgrh pr japaoge
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          // bl->bottomleft
          // tr:->topright

          // the reason "why there is  not top_left and bottom_right latitude and longitude ?

          // reason parth.txt file bnai hai usme hai
          // isko mat cherna yh rapid api ne diya hai naming bl_latitude,tr
          bl_latitude: sw.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
          tr_latitude: ne.lat,
        },
        // parth
        headers: {
          "X-RapidAPI-Key":
            "dcc28bb87fmsh7974b38ff02ecd0p11a003jsn9ce8434ef4ba",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );
    // url mai bhar bhi khi chaiye isliye globally define kri agr muje nhi chaiye hoti na
    // toh mai  mai options ke andr krta define aur sirf options paas krta
    // isme , lagakr paas krna pd rha because url chaiye

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default Getplacesdata;

// basic static value paas kri hai abhi

// import axios from 'axios';

// const URL= 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'
// const options = {
//   method: 'GET',

//   params: {
//     bl_latitude: '11.847676',
//     tr_latitude: '12.838442',
//     bl_longitude: '109.095887',
//     tr_longitude: '109.149359',

//   },
//   headers: {
//     'X-RapidAPI-Key': 'c9c1eb85f3msha209fed59fee767p1c64e2jsn0b17ff0a9386',
//     'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
//   }
// };
//  const Getplacesdata= async()=>{
//   // phele sw ne paaas nhi kiya tha maine toh static value chla rha tha ab mai paas krdiya hia toh uske accordingly kaam krege
//   try{
//     // const data se destructure kiya api se data arha phela vala
//     // varible-> same use krte jaisa api mai hai vesa hi same likhte mai same use krte
//     // agr destructure nhi krege toh status,data,paging vgrh sab ajaeaga hmko data se mtlb
//       const {data}= await axios.get(URL,options)
//       // url mai bhar bhi khi chaiye isliye globally define kri agr muje nhi chaiye hoti na
//       // toh mai  mai options ke andr krta define aur sirf options paas krta
//       // isme , lagakr paas krna pd rha because url chaiye
//       return data;
//   }catch(error){
//     console.log(error)
//   }
// }

// export default Getplacesdata
