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

   refresh = (reload) => {
      document.location.reload(reload)
   }


   render() {

      // Render sebelum login
      if (this.props.admin.username === '') {

         return (
            <div className='d-inline-flex'>
               <nav className="navbar navbar-expand-lg text-white fixed-top mt-1" style={{ backgroundColor: 'black' }}>
                  <div className="container text-uppercase">
                     <Link to='/admin'><h1 className="navbar-brand text-danger font-weight-bold">GET<span className='text-white font-weight-normal'>Motoka</span></h1></Link>
                     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                     </button>
                     <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav">
                           <li className="nav-item active mt-3">
                              <Link to='/admin'><p className="nav-link text-danger" style={{ marginTop: '10px' }}>Admin <span className='text-white'>Dashboard</span></p></Link>
                           </li>
                        </ul>
                     </div>
                     <Link to='/admin/login'><button className='btn p-0 mr-3 mb-1 text-uppercase text-white' style={{ marginBottom: '5px' }}>Login</button></Link>
                  </div>
               </nav>
            </div>
         )
      }

      // Render setelah login
      return (
         <div className='d-inline-flex p-0'>
            <nav className="navbar navbar-expand-lg text-white fixed-top" style={{ backgroundColor: 'black' }}>
               <div className="container text-uppercase">
                  <Link to='/admin'><h1 className="navbar-brand text-danger font-weight-bold mt-1">GET<span className='text-white font-weight-normal'>Motoka</span></h1></Link>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                     <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                     <div className="navbar-nav p-0 mt-3" style={{ fontSize: '15px' }}>
                        <Link to='/admin' type='a'><p className="nav-link text-danger">Dash<span className='text-white font-weight-lighter'>board</span></p></Link>
                        <Link to='/manageproduct' type='a'><p className="nav-link text-danger">Manage<span className='text-white font-weight-lighter'>Product</span></p></Link>
                        <Link to='/managebrand' type='a'><p className="nav-link text-danger">Manage<span className='text-white font-weight-lighter'>Brand</span></p></Link>
                        <Link to='/manageorder' type='a'><p className="nav-link text-danger">Manage<span className='text-white font-weight-lighter'>Order</span></p></Link>
                     </div>
                  </div>
                  <UncontrolledDropdown setActiveFromChild className='mt-1'>
                     <DropdownToggle tag='a' className="nav-link bg-transparent" caret>
                        Welcome,<span className='text-danger'> {this.props.admin.username}</span>
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