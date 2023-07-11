import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <>
        <div className='Footer'>
        <p ><strong>Shukr<span role="img" aria-label="Waheguru"> ੴ </span> Sabr</strong></p>
        <span>Created with ❤️ by Parth Ratra.</span>
        {/* <a href=''>View Source Code</a> */}
        <div className="social-links">
                <a href='https://github.com/ParthRatra'><img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' alt='GitHub'/></a>
                <a href='https://www.linkedin.com/in/parth-ratra-2476491ba/'><img src='https://cdn-icons-png.flaticon.com/512/174/174857.png' alt='LinkedIn'/></a>
            </div>
        </div>
    </>
  )
}

export default Footer