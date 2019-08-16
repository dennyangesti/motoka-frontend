import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import HeaderAdmin from './HeaderAdmin';

class Admin extends Component {

   render() {
      return (
         <div>
            <HeaderAdmin />
            <div className="container-fluid" style={{ marginTop: '50px' }}>
               <div className='row'>
                  <nav className='col-md-2 d-none d-md-block bg-dark sidebar'>
                     <div className='sidebar-sticky'>
                        <ul className='nav flex-column text-white'>
                           <li className='nav-item'>
                              <a className='nav-link active' href='#'><span className='text-white'>Dashboard</span></a>
                           </li>
                           <li className='nav-item'>
                              <a className='nav-link' href='#'><span className='text-white'>Order</span></a>
                           </li>
                           <li className='nav-item'>
                              <a className='nav-link' href='#'><span className='text-white'>Product</span></a>
                           </li>
                           <li className='nav-item'>
                              <a className='nav-link' href='#'><span className='text-white'>Customer</span></a>
                           </li>
                           <li className='nav-item'>
                              <a className='nav-link' href='#'><span className='text-white'>Report</span></a>
                           </li>
                        </ul>
                     </div>
                  </nav>
                  <div className='col-md-9 ml-sm-auto col-lg-10 pt-3 px-4'>
                     <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
                        <h1 className='h2'>Dashboard</h1>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default Admin