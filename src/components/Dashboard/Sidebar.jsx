import React from 'react'
import { logout } from '../../services/operations/authApi'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../Header/Header'
const Sidebar = () => {

  const {loading:profileLoading} =  useSelector((state) => state.profile)
  const {loading:authLoading} =  useSelector((state) => state.auth)


  if(authLoading || profileLoading){
    return(
      <>
      <div className='mt-10'>
      <h1>Loading...</h1>
      </div>
      </>
    )
  }
// flex col means ek column mai rhege

  return (
    <>
       <div className=' bg-white h-[calc(100vh-3.5rem)] '>
      <div className='min-w-[288px] flex-col  border-r-richblack-700  py-10'>
        <div className='flex flex-col'>

        </div>
      </div>
      </div>
    </>
  )
}

export default Sidebar