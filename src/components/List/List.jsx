import React, { useState } from 'react'
import { Grid} from '@mui/material'
import './List.css'
import PlaceDetails from '../PlaceDetails/PlaceDetails'
const List = () => {
  const[type,settype]=useState("Restaurants")
  const[rating,setrating]=useState('')
  const places=[{
    name:"parth"
  },
  {
    name:"harsh"
  },
  {
    name:"jiyan"
  },
  {
    name:'vijay'
  },
  {
    name:'hello'
  },
  {
    name:'kseeseho'
  },
  {
    name:'vijay'
  },
  {
    name:'kyahallhe'
  }
    
]
  return (

    <>
      <div className="listing" style={{padding:'25px'}}>
      
        <span style={{fontWeight:'bold',fontSize:'26px'}}>
          Restaurants,Hot<span style={{color:'#8E3A52'}}>els & Attractions</span>
        </span>
        {/* line mai lane ke liye do select choose vale */}
        <div className="line" style={{display:'flex'}}>

        <div  style={{ margin: '5px', minWidth: '120px', marginBottom: '30px',}} className="box">
          <span >
            Type
          </span>
          <br></br>
          <select name="cars" id="cars" value={type} onChange={(e)=>settype(e.target.value)} style={{outline:'none'}}>
          <option value="Restaurants">Restaurants</option>
          <option value="Hotels">Hotels</option>
          <option value="Attractions">Attractions</option>
        </select>

        </div>
        <div  style={{ margin: '5px', minWidth: '120px', marginBottom: '30px',}} className="box">
          <span >
            Rating
          </span>
          <br></br>
          <select name="cars" id="cars" value={rating} onChange={(e)=>setrating(e.target.value)} style={{outline:'none'}}>
          <option value={0}>All</option>
          <option value={3}>Above 3.0</option>
          <option value={4}>Above 4.0</option>
          <option value={4.5}>Above 4.5</option>
        </select>

        </div>
        
        
      </div>
      <Grid container spacing={3} className='griding'>
      {places?.map((kuchbhi,index)=>{
          return (
            <><Grid item key={index} xs={12}>
            <PlaceDetails hello={kuchbhi}/>
        </Grid>
        </>
          )
        })}
      </Grid>
        

      </div>
    </>
  )
}

export default List