import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { onLogoutUser } from '../action'

import {
   Button,
   Collapse,
   Navbar,
   NavbarToggler,
   NavbarBrand,
   Nav,
   NavItem,
   UncontrolledDropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem,
   ButtonDropdown,
   InputGroup,
   InputGroupAddon,
   Input
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
      this.props.onLogoutUser()
   }

   render() {

      // const search = require('../../src/image/search.png');
      // const setting = require('../../src/image/setting.png');
      // const account = require('../../src/image/account.png');
      // const bag = require('../../src/image/bag.png');
      // const cart = require('../../src/image/cart.png');
      // const mustache = require('../../src/image/mustache.png');
      // const logout = require('../../src/image/logout.png');



      // Render sebelum login
      if (this.props.user.username === '') {
         
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
                              <Link to='/'><p className="nav-link text-danger">Home</p></Link>
                           </li>
                           <UncontrolledDropdown setActiveFromChild>
                              <DropdownToggle tag="a" className="nav-link" caret>
                                 Shop
                           </DropdownToggle>
                              <DropdownMenu>
                                 <Link to='/category'><DropdownItem>Car</DropdownItem></Link>
                                 <Link to='/category'><DropdownItem>Motorcycle</DropdownItem></Link>
                                 <Link to='/category'><DropdownItem>Accessories</DropdownItem></Link>
                                 <Link to='/category'><DropdownItem>Apparel</DropdownItem></Link>
                              </DropdownMenu>
                           </UncontrolledDropdown>
                           <li className="nav-item">
                              <Link to='/brand'><p className="nav-link text-white">Brand</p></Link>
                           </li>
                           <Link to='/about'><li className="nav-item">
                              <p className="nav-link text-white">About</p>
                           </li></Link>
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
         <h1>hello World</h1>
         // <div className='fixed-top'>
         //    <Navbar color="light" light expand="md">
         //       <NavbarBrand href="/" className="mr-5"> <img
         //          src={mustache}
         //          height={'30px'}
         //          alt='' /> germ-o
         //       </NavbarBrand>
         //       <NavbarToggler onClick={this.toggle} />
         //       <InputGroup>
         //          <Input />
         //          <InputGroupAddon addonType="append">
         //             <Button color="secondary" className="mr-5">
         //                <img src={search} height={'20px'} />
         //             </Button>
         //          </InputGroupAddon>
         //       </InputGroup>
         //       <Collapse isOpen={this.state.isOpen} navbar>
         //          <Nav className="ml-auto" navbar>

         //             <NavItem className='mt-2 mr-4'>
         //                <Link to='/' >
         //                   <img
         //                      src={bag}
         //                      height={'30px'}
         //                      alt='' />
         //                </Link>
         //             </NavItem>

         //             <NavItem className='mt-2 mr-4'>
         //                <Link to='/manageproduct'>
         //                   <img
         //                      src={setting}
         //                      height={'30px'}
         //                      alt='' />
         //                </Link>
         //             </NavItem>

         //             <NavItem className='mt-2 mr-4'>
         //                <Link to='/cart'> <img
         //                   src={cart}
         //                   height={'30px'}
         //                   alt='' />
         //                </Link>
         //             </NavItem>

         //             <UncontrolledDropdown nav inNavbar>
         //                <DropdownToggle nav caret>
         //                   Hello, {this.props.user.username}
         //                   <img
         //                      src={account}
         //                      height={'30px'}
         //                      alt='' />
         //                </DropdownToggle>
         //                <DropdownMenu right>
         //                   <DropdownItem>
         //                      <Button
         //                         className="dropdown-item"
         //                         onClick={this.onButtonClick}>
         //                         Logout  <img
         //                            src={logout}
         //                            height={'23px'}
         //                            alt='' />
         //                      </Button>

         //                   </DropdownItem>
         //                </DropdownMenu>
         //             </UncontrolledDropdown>

         //          </Nav>
         //       </Collapse>
         //    </Navbar>
         // </div>
      )
   }
}


const mapStateToProps = state => {
   return {
      user: state.auth // id dan username
   }
}

export default connect(mapStateToProps, { onLogoutUser })(Header)