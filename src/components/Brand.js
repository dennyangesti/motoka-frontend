import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import BrandCar from './BrandCar'
import BrandMoto from './BrandMoto'

class Brand extends Component {

   componentDidMount() {
      window.scrollTo(0, 0);
   }

   render() {
      return (
         <div>
            <div className='container-fluid' style={{ marginTop: '50px', backgroundColor: 'black' }}>
               <div className=' display-4 text-center mb-4 text-white font-weight-light'>Our <span className='text-danger font-weight-normal'>Brands</span></div>
            </div>
            <BrandCar />
            <BrandMoto />
         </div>
      )
   }
}

export default Brand