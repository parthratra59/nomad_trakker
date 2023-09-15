import React, { useContext, useState, createRef, useEffect } from "react";
import { Grid, InputLabel, Select, MenuItem } from "@mui/material";
import { CircularProgress } from "@mui/material";
import "./List.css";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import { GlobalContext } from "../../components2/Home";
import { GlobalContext2 } from "../../App";
import "../Spinner/Spinner.css";
const List = ({ places, loadinghorhi }) => {
  // is se pta chl rha left side mai pauch rha ky data
  const { receivekrega, settype, type, ratekro, setrating } =
    useContext(GlobalContext);
  // use context se maine receive kiya vo sab
  const {background,setBackground} = useContext(GlobalContext2)

  const dynamicBackgroundColor = background ? "" : "invisible";



  // const dynamicBackgroundColor = background ? "op" :"";

  // yh console maine left side mai click kru toh ride side mai dikhe uske liye hai
  // console.log(receivekrega)

  // now i want to scroll to the same card when i will click that

  // yh thoda complicated method hai
  // yh places change hoga mai chata yh vapais call ho

  const [startingref, setref] = useState([]);
  useEffect(() => {
    // yh bhhaut hi complex hai vaise itna complex nhi hota useref ka use krna toh abhi isme jyada maine
    // dimag nhi lgaya hai
    // mostly hm yh krte nhi hai isme bahut places hai hr places ke liye alg hai isliye kr rhe
    // ussaly hm ek hi ref lete hai isme hme bhaut sare lene pd rhe

    // hmkko koi start mai nhi chaiye ilsiye udhr hmne _ pass kiya
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => startingref[i] || createRef());

    // usually yh nhi krte hm
    setref(refs);
    // jab kbhi places change ho toh yh render ho
    // eslint-disable-next-line
  }, [places]);

  // ab hme static nhi chaiye
  //   const places=[{
  //     name:"parth"
  //   },
  //   {
  //     name:"harsh"
  //   },
  //   {
  //     name:"jiyan"
  //   },
  //   {
  //     name:'vijay'
  //   },
  //   {
  //     name:'hello'
  //   },
  //   {
  //     name:'kseeseho'
  //   },
  //   {
  //     name:'vijay'
  //   },
  //   {
  //     name:'kyahallhe'
  //   }

  // ]
  return (
    <div className="listing" style={{ padding: "10px" }}>
      <span
        className={"heading text-center"}
        style={{ fontWeight: "bold", fontSize: "26px", userSelect: "none" }}
      >
        Restaurants,Hot
        <span style={{ color: "#8E3A52" }}>els & Attractions</span>
      </span>

      {/* line mai lane ke liye do select choose vale */}
      {loadinghorhi ? (
        <div class="custom-loader"></div>
      ) : (
        <>
          <div className="line" style={{ display: "flex" }}>
            <div
              style={{ margin: "15px", minWidth: 120, marginBottom: "40px" }}
              className="box"
            >
              <InputLabel style={{ userSelect: "none" }}><span className={`${dynamicBackgroundColor}`}>Type</span></InputLabel>

              {/* usecontext use kiya hai dekh */}

              {/* type tha stating mai api call hui usme type bhi paas hai app.js mai parameter mai type
          bhi paas kiya hai toh type agya vha se 
           */}

              {/* filterimportant file mai maine yh explain kiya yhi chij  */}
              {/* important->  idhr ek confusion askta hm context hook mai ek child se dusre child mai interaction mai use krte hai but isme aisa ku nhi hua dhyan se dekho hmne kya kiya type hota ho receive krene vala mera short form aisa chlta and settype hota jo send kr rha toh isme do no ek mai hi hai type bhi isme hai settype bhi isme hai  */}
              {/* <span className={`${dynamicBackgroundColor}`}> */}
              <span className={`${dynamicBackgroundColor}`}>
              <Select
                value={type}
                onChange={(e) => settype(e.target.value)}
                style={{ outline: "none", userSelect: "none" }}
              >
                {/* restaruants,hotels,attractions api mai small hai isliye 
          small mai liya hai nhi toh match nhi honge */}
                <MenuItem value="restaurants">
                Restaurants
               </MenuItem>
                <MenuItem value="hotels">Hotels</MenuItem>
                <MenuItem value="attractions">Attractions</MenuItem>
              </Select>
              </span>
            </div>
            
            <div
              style={{
                margin: "15px",
                minWidth: "120px",
                marginBottom: "30px",
                userSelect: "none",
              }}
              className="box"
            >
            <span className={`${dynamicBackgroundColor}`}>
              <InputLabel>Rating</InputLabel>

              <Select
                value={ratekro}
                onChange={(e) => setrating(e.target.value)}
              >
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={3}>Above 3.0</MenuItem>
                <MenuItem value={4}>Above 4.0</MenuItem>
                <MenuItem value={4.5}>Above 4.5</MenuItem>
              </Select>
              </span>
            </div>
            
          </div>
          {/* Added a div with ref to target scrolling */}
          <Grid container spacing={3} className="griding">
            {/* yh hogya ek trh se container div vala but yh responsive hai 
      same chij */}
            {/* grid ke items mai ab mapping strt hogi images vgrh ki */}
            {places?.map((kuchbhi, index) => {
              return (
                <>
                  <Grid ref={startingref[index]} item key={[kuchbhi]} xs={12}>
                    {/* hme kuch bhi prop use krne se phele vo component ku likhna pdta uska reason important_rendering.txt file mai hai */}
                    <PlaceDetails
                      hello={kuchbhi}
                      // hm chate na right side se click kre aur yh scroll hojae toh iska mtlb yh hai
                      // like usne 35 pr click kiya toh index dekhega 35 kha hai aur match krlega
                      selectkiya={Number(receivekrega) === index}
                      refprop={startingref[index]}
                    />
                  </Grid>
                </>
              );
            })}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
