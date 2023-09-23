import React, { useEffect, useState, createContext } from "react";
import Header from "../components/Header/Header";
import Maps from "../components/Maps/Maps";
import Getplacesdata from "../api/api";
import List from "../components/List/List";


// import './index.css'

// import './App.css'
import { Grid } from "@mui/material";
// import Navbar from './Navbar';

// maine places api se idhr hi mnagwali then ab mai parent se child mai bhej rha chijke ek sath manage horhi chije
export const GlobalContext = createContext({});

const Home = () => {
  // hm useeffect ka use krte jab kbhi api ke sath kaam kr rhe hote
  // and render ke liye map fucntion use krna hota then usestate ka use krte
  const [places, setplaces] = useState([]);

  // ab muje cordinates ki need pdegi ki kha hai place mao mai toh muje krna pdega
  const [coordinates, setcoordinates] = useState({});
  const [bounds, setbounds] = useState({});

  const [receivekrega, sendkrega] = useState("");

  const [isloading, setloading] = useState(false);

  const [type, settype] = useState("restaurants");
  const [ratekro, setrating] = useState(0);
  //  context mai hmne type settyperating setratiing bhi liya ab
  // globalcontext.provider mai paas kiya vo
  // idhr create context horha hai aur globalcontext mai paas kr rhe hai
  // starting mai type mai restaurant tha vo update hoga list mai jakr

  // ab mai list mai jarha  because filter udhr hi hai na ab list.jsx mai iska answer hai

  const [filtered, setfilteredplaces] = useState([]);




  

 
  
  // login not login concept
  // const[login,setlogin]=useState(false)
  // {} yh bhi chlega
  // array bhi kr skte nhi toh object bhi kr skte

  // phele maine dependecy array mai coordinates and bound paas kra tha
  // but jis se hr baar jgh bdle toh vo render ya for vo change ho
  // fir yhi kaam useeffect se maine  kraya

  // useEffect(() => {

  //   console.log(coordinates,bounds)
  //   Getplacesdata()
  //   .then((hi)=>{
  //     console.log(hi)
  //     setplaces(hi);

  //   })

  // }, [coordinates,bounds])

  // use effect tb use krte app jb app ke flow se jb different kaam kra rhe hote toh iska use hota
  // isliye rating ke liye bhi use effect use hua and restaurnant vale filter ke liye type paas kiya hua hai

  useEffect(() => {
    // aise jb function ke andr function likh rhe hote toh vo call back function hota
    // Filter places based on rating
    // const filtered = places.filter((place) => place.rating > ratekro);
    if (places && places.length > 0) {
      const filtered = places.filter((place) => place.rating > ratekro);
      setfilteredplaces(filtered);
    }
  }, [ratekro]);
  // jb rating bdle tb bhi yh kaam mai aye

  useEffect(() => {
    // mai chata jaise hi khule vo current location pr ajae
    // ise current location khul gya jo hm pop up dekte hai na fir cookies mai jakr enable kr te hai
    // coords bydefault hai
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setcoordinates({ lat: latitude, lng: longitude });
      }
    );
    // [] empty isliye hai atleast ek baar toh chaiye hm current location ke liye
  }, []);
  useEffect(() => {
    // console.log(coordinates,bounds)

    // starting mai type mai restaurant tha vo update hoga list mai jakr
    // bounds hoga tbhi toh kr paege agr hmare paas lat longitude nhi hog toh  kaise krege
    // agr hmne bounds tk hi chor diya toh problem hme hai ki bounds starting mai null hai toh
    // jb hmne bounds daal diya toh vo render hua and bounds null hai toh error aega
    // aur jb jb hm autocomplete feature k use kr rhe honge toh vo pkdega nhi
    // isliye bounds.sw and bounds.ne daal rhe hai
    // ab vapis switch back nhi hoga starting vale pr jgh change krege toh
    if (bounds.sw && bounds.ne) {
      setloading(true);
      Getplacesdata(type, bounds.sw, bounds.ne).then((data) => {
        console.log(data);
        // isme jo empty vale hat jaege
        setplaces(
          data?.filter(
            (nonemptyplace) =>
              nonemptyplace.name &&
              nonemptyplace.num_reviews > 0 &&
              nonemptyplace.photo
          )
        );
        // jb bhi re render hotoh vapis empty hojae pr ajae filter
        setfilteredplaces([]);
        setloading(false);
      });
    }

    // yh dependency array hai jb mai [] paas krta it means empty dependency array hai
    // it means yh ek baar hi render hoga ab dikt isme yh hai ki hm agr jgh change bhi kre toh yh nhi aega dursi baar
    // {data: Array(33), filters: {…}, filters_v2: {…}, restaurant_availability_options: {…}, paging: {…}} nhi bnega
    // isliye hm coordinates and bounds daal rhe dependency array mai jis se jb jb change kre toh
    // vo re render ho

    // coordinates ab hata do nhi toh do baar render horha load ke baad isliye vapis gwalior pr pauch rha hai
    // map vale mai bhi coordinate render horha and list vale mai isliye hm header mai change kr rhe na us  se map mai bhi horha and places mai bhi horha
  }, [type, bounds]);
  return (
    // bs isme daldo jo bnaya hai and ab koi prop use krne ki jrurt nhi jaise lifting state up mai paas bhui krna pdta isme jrurt nhi

    // github pr explnation hai context hook ka dekhlena jakr
    <GlobalContext.Provider
      value={{ receivekrega, sendkrega, type, settype, ratekro, setrating }}
    >
      <>
        {/* places toh same hi jarhi hai  filter ke baad bbhi vo bhi apni place bdl rhi */}

        <Header setcoordinating={setcoordinates} />
        
        {/* <Header/> */}
        <div className="flex h-100vh w-100%">
        <Grid container spacing={3} >
          <Grid item xs={12} md={4}>
            {/*  */}
            <List  isLoading={isloading} places={filtered.length ? filtered : places} />
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Maps
              setcoordinates={setcoordinates}
              setbounds={setbounds}
              coordinates={coordinates}
              //  filteredplaces ki array ki length hua toh filtered vala data aega nhi toh places vala
              places={filtered.length ? filtered : places}
              loadinghorhi={isloading}
            />
          </Grid>
        </Grid>

        {/* <Footer/> */}

        {/* routes */}
        </div>
      </>
    </GlobalContext.Provider>
  );
};

export default Home;
