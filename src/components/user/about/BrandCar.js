import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class BrandCar extends Component {

   render() {

      return (
         <div className='container my-5'>
            <div className='row'>
               <div className='col-2 text-center'>
                  <img src="https://i.ibb.co/2N4M4kQ/logo-1.png" alt='logo-brand' />
               </div>
               <div className='col-2 text-center'>
                  <img src="https://i.ibb.co/qjsnFm8/logo-2.png" alt='logo-brand' />
               </div>
               <div className='col-2 text-center'>
                  <img src="https://i.ibb.co/qBs58XC/logo-3.png" alt='logo-brand' />
               </div>
               <div className='col-2 text-center'>
                  <img src="https://i.ibb.co/nrd7Tct/logo-4.png" alt='logo-brand' />
               </div>
               <div className='col-2 text-center mt-4'>
                  <img src="https://i.ibb.co/dKtFXdn/logo-5.png" alt='logo-brand' />
               </div>
               <Link to='/dashboard'>
                  <div className='col-2 text-center'>
                     <img src="https://i.ibb.co/b5vtVBg/logo-6.png" alt='logo-brand' />
                  </div>
               </Link>
            </div>
         </div>
      )
   }
}

export default BrandCar