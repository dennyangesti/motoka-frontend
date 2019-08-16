import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { logoutAdmin } from '../../action/index'

import {
   UncontrolledDropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem
} from 'reactstrap';


class HeaderAdmin extends Component {

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
      this.props.logoutAdmin()
   }

   render() {

      // Render sebelum login
      if (this.props.admin.username === '') {

         return (
            <div className='d-inline-flex'>
               <nav className="navbar navbar-expand-lg text-white fixed-top" style={{ backgroundColor: 'black' }}>
                  <div className="container text-uppercase">
                     <Link to='/admin'><h1 className="navbar-brand text-danger font-weight-bold">GET<span className='text-white font-weight-normal'>Motoka</span></h1></Link>
                     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                     </button>
                     <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav">
                           <li className="nav-item active">
                              <Link to='/admin'><p className="nav-link text-danger">Admin <span className='text-white'>Dashboard</span></p></Link>
                           </li>
                        </ul>
                     </div>
                     <Link to='/admin/login'><button className='btn p-0 mr-3 text-uppercase text-white'>Login</button></Link>
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
                  <Link to='/admin'><h1 className="navbar-brand text-danger font-weight-bold">GET<span className='text-white font-weight-normal'>Motoka</span></h1></Link>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                     <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                     <ul className="navbar-nav">
                        <li className="nav-item active">
                           <Link to='/admin'><p className="nav-link text-danger">Admin <span className='text-white'>Dashboard</span></p></Link>
                        </li>
                     </ul>
                  </div>
                  <UncontrolledDropdown setActiveFromChild >
                     <DropdownToggle tag='a' className="nav-link bg-transparent" caret>
                        Hello, {this.props.admin.username}
                     </DropdownToggle>
                     <DropdownMenu>
                        <DropdownItem className="nav-item btn-dark"
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
      admin: state.admin_auth // id dan username
   }
}

export default connect(mapStateToProps, { logoutAdmin })(HeaderAdmin)