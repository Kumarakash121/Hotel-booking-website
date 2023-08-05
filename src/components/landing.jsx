import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div className='row landing justify-content-center'>
        <div className='col md-12 my-auto text-center' style={{borderRight:'8px solid white'}}>
        <h2 style={{color:'white',fontSize:'130px'}}>our rooms</h2>
        <h1 style={{color:'white'}}>"There is only one boss .The guest"</h1>
        <Link to='/home'>
        <button className='landinbtn' style={{color:'black', borderRadius:'5px',padding:'10px'}}>get started</button>
        </Link>
        </div>
    </div>
  )
}

export default Landing