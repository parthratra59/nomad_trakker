import React from 'react'
import Iconbutton from './Iconbutton'
// confirmmodal open hogya 
const Confirmationmodal = ({modalData}) => {
  return (
  <>
    <div>
        <div>
            <p>{modalData.text1}</p>
            <p>{modalData.text2}</p>
        </div>
        {/* ab button chaiye */}
        <div>
        {/* there will be two buttons ek toh simple sa cancel hoga ek logouut jo ki Iconbutton hai  ka */}
        {/* logout hua hai toh apko logout vala function call krna hoga auth.js se  icon button mai onclieck event hoga and  text logout ka uske upr */}
            <Iconbutton 
                onClick={modalData?.btn1handler}
                text={modalData?.btn1text}
            />
            <button onClick={modalData?.btn2handler}>{modalData?.btn2text}</button>
        </div>
        
    </div>
  </>
  )
}

export default Confirmationmodal