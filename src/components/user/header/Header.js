import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { logoutUser } from '../../../action/index'

import {
   UncontrolledDropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem
} from 'reactstrap';


class Header extends Component {

   constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
         isOpen: false,
         dropdownOpen: false
      };
   }
   toggle() {
      this.setState({
         isOpen: !this.state.isOpen,
         dropdownOpen: !this.state.dropdownOpen
      });
   }

   onButtonClick = () => {
      // Menghapus username dari redux state
      this.props.logoutUser()
   }

   render() {

      // Render sebelum login
      if (this.props.user.username === '') {

         return (
            <div className='d-inline-flex'>
               <nav className="navbar navbar-expand-md text-white fixed-top" style={{ backgroundColor: 'black' }}>
                  <div className="container text-uppercase">
                     <Link to='/'><h1 className="navbar-brand text-danger font-weight-bold">GET<span className='text-white font-weight-normal'>Motoka</span></h1></Link>
                     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                     </button>
                     <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav mb-0 mt-2">
                           <li className="nav-item active">
                              <Link to='/'><p className="nav-link text-white">Home</p></Link>
                           </li>
                           <li className="nav-item">
                              <Link to='/product'><p className="nav-link text-white">Product</p></Link>
                           </li>
                           <li className="nav-item">
                              <Link to='/brand'><p className="nav-link text-white">Event</p></Link>
                           </li>
                           <Link to='/about'><li className="nav-item">
                              <p className="nav-link text-white">About</p>
                           </li></Link>
                        </ul>
                     </div>
                     <Link to='/login' type='a'><div className='btn p-0 mr-3 mb-1 text-uppercase text-white'>Login</div></Link>
                     <Link to='/register' type='a'><div className='btn p-0 mb-1 text-uppercase text-danger'>Register</div></Link>
                  </div>
               </nav>
            </div>
         )
      }

      // Render setelah login
      return (
         <div className='d-inline-flex'>
            <nav className="navbar navbar-expand-md text-white fixed-top" style={{ backgroundColor: 'black' }}>
               <div className="container text-uppercase">
                  <Link to='/'><h1 className="navbar-brand text-danger font-weight-bold">GET<span className='text-white font-weight-normal'>Motoka</span></h1></Link>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                     <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                     <ul className="navbar-nav mb-0 mt-2">
                        <li className="nav-item active">
                           <Link to='/'><p className="nav-link text-white">Home</p></Link>
                        </li>
                        <li className="nav-item">
                           <Link to='/product'><p className="nav-link text-white">Product</p></Link>
                        </li>
                        <li className="nav-item">
                           <Link to='/brand'><p className="nav-link text-white">Event</p></Link>
                        </li>
                        <Link to='/about'><li className="nav-item">
                           <p className="nav-link text-white">About</p>
                        </li></Link>
                     </ul>
                  </div>
                  <div>
                     <ul className="navbar-nav mb-0 mt-2">
                        <li className="nav-item active">
                           <Link to='/cart'>
                              <p className="nav-link text-white">Cart</p>
                           </Link>
                        </li>
                        <li className="nav-item">
                           <UncontrolledDropdown setActiveFromChild >
                              <DropdownToggle tag='a' className="nav-link bg-transparent mb-1" caret>
                                 Welcome, <span className='text-danger'>{this.props.user.username}</span>
                              </DropdownToggle>
                              <DropdownMenu>
                                 <DropdownItem tag='a' href='/profile' className="nav-item btn-outline-dark text-capitalize">
                                    Profile
                           </DropdownItem>
                                 <DropdownItem className="nav-item btn-dark"
                                    onClick={this.onButtonClick}>
                                    Logout
                           </DropdownItem>
                              </DropdownMenu>
                           </UncontrolledDropdown>
                        </li>
                     </ul>

                  </div>
               </div>
            </nav>
         </div>
      )
   }
}


const mapStateToProps = state => {
   return {
      user: state.auth // id dan username
   }
}

export default connect(mapStateToProps, { logoutUser })(Header)

