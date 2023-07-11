import React, { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Maps from './components/Maps/Maps'
import Getplacesdata from './api/api'
import List from './components/List/List'
import PlaceDetails from './components/PlaceDetails/PlaceDetails'
import './App.css'
import Footer from './components/Footer/Footer'
const App = () => {

  // hm useeffect ka use krte jab kbhi api ke sath kaam kr rhe hote
  // and render ke liye map fucntion use krna hota then usestate ka use krte 
  const [places,setplaces]=useState([]) 

  // ab muje cordinates ki need pdegi ki kha hai place mao mai toh muje krna pdega
  const[coordinates,setcoordinates]=useState({})
  const [bounds,setbounds]=useState({})





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



  useEffect(() => {
    // mai chata jaise hi khule vo current location pr ajae
    // ise current location khul gya jo hm pop up dekte hai na fir cookies mai jakr enable kr te hai 
    // coords bydefault hai
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setcoordinates({ lat: latitude, lng: longitude });
    });
    // [] empty isliye hai atleast ek baar toh chaiye hm current location ke liye
    
  }, []);
  useEffect(() => {

    // console.log(coordinates,bounds)
    Getplacesdata(bounds.sw,bounds.ne)
    // axios mai .then ke sath chlta hai promises hota hai
    .then((hi)=>{
      console.log(hi)
      setplaces(hi);
      
    })
  // yh dependency array hai jb mai [] paas krta it means empty dependency array hai 
  // it means yh ek baar hi render hoga ab dikt isme yh hai ki hm agr jgh change bhi kre toh yh nhi aega dursi baar
  // {data: Array(33), filters: {…}, filters_v2: {…}, restaurant_availability_options: {…}, paging: {…}} nhi bnega 
  // isliye hm coordinates and bounds daal rhe dependency array mai jis se jb jb change kre toh 
  // vo re render ho
  }, [coordinates,bounds])
  return (
   <>
      <Header/>
      <div className='App'>
        <div className='left'>
          <List places={places}/>
        </div>
        <div className='right'>
            <Maps
                setcoordinates={setcoordinates}
                setbounds={setbounds}
                coordinates={coordinates}
            />
        </div>
      </div>

      {/* <Footer/> */}

   </>

  )
}

export default App  