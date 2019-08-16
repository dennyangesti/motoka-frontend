import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { logoutUser } from '../../action'

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
               <nav className="navbar navbar-expand-lg text-white fixed-top" style={{ backgroundColor: 'black' }}>
                  <div className="container text-uppercase">
                     <Link to='/'><h1 className="navbar-brand text-danger font-weight-bold mt-2">GET<span className='text-white font-weight-normal'>Motoka</span></h1></Link>
                     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                     </button>
                     <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav pt-3">
                           <li className="nav-item active">
                              <Link to='/'><p className="nav-link text-danger">Home</p></Link>
                           </li>
                           <li className="nav-item">
                              <Link to='/category'><p className="nav-link text-white">Product</p></Link>
                           </li>
                           <li className="nav-item">
                              <Link to='/about'><p className="nav-link text-white">About</p></Link>
                           </li>
                        </ul>
                     </div>
                   <Link to='/login'><button className='btn p-0 mr-3 text-uppercase text-white'>Login</button></Link>
                     <Link to='/register'><button className='btn p-0 text-uppercase
                      text-danger'>Register</button></Link>
                  </div>
               </nav>
            </div>
         )
      }

      // Render setelah login
      return (
         <div className='d-inline-flex'>
               <nav className="navbar navbar-expand-lg text-white fixed-top" style={{ backgroundColor: 'black' }}>
                  <div className="container text-uppercase">
                     <Link to='/'><h1 className="navbar-brand text-danger font-weight-bold">GET<span className='text-white font-weight-normal'>Motoka</span></h1></Link>
                     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                     </button>
                     <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav">
                           <li className="nav-item active">
                              <Link to='/'><p className="nav-link text-white">Home</p></Link>
                           </li>
                           <li className="nav-item">
                              <Link to='/category'><p className="nav-link text-white">Shop</p></Link>
                           </li>
                           <li className="nav-item">
                              <Link to='/brand'><p className="nav-link text-white">Brand</p></Link>
                           </li>
                           <Link to='/about'><li className="nav-item">
                              <p className="nav-link text-white">About</p>
                           </li></Link>
                        </ul>
                     </div>
                     <UncontrolledDropdown setActiveFromChild >
                        <DropdownToggle tag='a' className="nav-link bg-transparent" caret>
                           Hello, {this.props.user.username}
                        </DropdownToggle>
                        <DropdownMenu>
                           <DropdownItem tag='a' href='/profile' className="nav-item btn-outline-dark text-capitalize">
                                 Edit Profile
                           </DropdownItem>
                           <DropdownItem  className="nav-item btn-dark"
                                 onClick={this.onButtonClick}>
                                 Logout
                           </DropdownItem>
                        </DropdownMenu>
                     </UncontrolledDropdown>

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