import React,{createContext,useState} from 'react'
import Home from './components2/Home'
import Login from './components2/Login'
import Signup from './components2/Signup'
import {Routes,Route}  from 'react-router-dom'
export const GlobalContext2 =createContext({});
const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
   

    
  return (
    <GlobalContext2.Provider value={{isLoggedIn,setIsLoggedIn}}>
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/signup' element={<Signup/>} ></Route>
    </Routes>
    </GlobalContext2.Provider>
  )
}

export default App