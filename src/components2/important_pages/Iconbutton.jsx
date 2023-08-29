import React from 'react'

const Iconbutton = ({text,onClick}) => {
  return (
    <>  
        <button  className='flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 text-sm md:text-lg px-3 md:px-5 font-semibold text-richblack-900 undefined' onClick={onClick}>{text}</button>

    </>
  )
}

export default Iconbutton