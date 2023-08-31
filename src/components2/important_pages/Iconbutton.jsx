import React from 'react'
import {FiEdit} from "react-icons/fi"



const Iconbutton = ({
    text,
    onClick,
   
    disabled,
    outline=false,
    
    type,
}) => {
  return (
    <button className=' relative flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 text-sm md:text-lg px-3 md:px-5 font-semibold text-richblack-900' 
    disabled={disabled}
    onClick={onClick}
    type={type}
    outline={outline}>

       {text}
        <FiEdit/>
    </button>
  )
}

export default Iconbutton