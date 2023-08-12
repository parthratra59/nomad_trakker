import React from 'react'
import Home from './components2/Home'
import Login from './components2/Login'
import Signup from './components2/Signup'
import {Routes,Route}  from 'react-router-dom'
const App = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/signup' element={<Signup/>} ></Route>
    </Routes>
  )
}

export default App