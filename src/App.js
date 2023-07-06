import React from 'react'
import Header from './components/Header/Header'
import Maps from './components/Maps/Maps'

import List from './components/List/List'
import PlaceDetails from './components/PlaceDetails/PlaceDetails'
import './App.css'
import Footer from './components/Footer/Footer'
const App = () => {
  return (
   <>
      <Header/>
      <div className='App'>
        <div className='left'>
          <List/>
        </div>
        <div className='right'>
            <Maps/>
        </div>
      </div>

      <Footer/>

   </>

  )
}

export default App