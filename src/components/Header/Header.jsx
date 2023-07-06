import React from 'react'
import './Header.css'
import logo from '../pics/logo.png'
import {FcSearch} from 'react-icons/fc'
const Header = () => {
  return (
    <div className='header'>
       <div className="logo">
          <img src={logo}/>
       </div>
       <div className="search">
        <input type='text' placeholder='Explore the places...'></input>
        <div className="seacrh-icon">
          <FcSearch/>
        </div>
       </div>
    </div>
  )
}

export default Header