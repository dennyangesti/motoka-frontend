import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { loginAdmin } from '../../../action/index'
import HeaderAdmin from '../HeaderAdmin'


class LoginAdmin extends Component {

   onEnter = (action) => {
      action.preventDefault()
      this.onButtonClick()
   }


   // Bikin Function
   onButtonClick = () => {
      // Ambil data di text input
      // username dan password
      var username = this.username.value
      var password = this.password.value

      // Tembak data ke database
      this.props.loginAdmin(username, password)
      // console.log(this.props.loginAdmin)
   }

   render() {

      if (this.props.admin.username === '') {
         return (
            <div>
               <HeaderAdmin />
               <div className='mb-2 row' style={{ marginTop: "70px" }}>
                  <div className='col-sm-4 mx-auto card' style={{ backgroundColor: '' }}>
                     <div className='card-body'>

                        <div className=' border-bottom border-secondary card-title d-flex justify-content-center'>
                           <h1>Login Here</h1>
                        </div>

                        <div className='card-title d-flex justify-content-end mt-1'>
                           <h4>Username</h4>
                        </div>

                        <form className='input-group' onSubmit={this.onEnter}>
                           <input
                              className='form-control'
                              type='text'
                              ref={(input) => { this.username = input }}
                           />
                        </form>

                        <div className='card-title d-flex justify-content-end mt-3'>
                           <h4>Password</h4>
                        </div>

                        <form className='input-group' onSubmit={this.onEnter}>
                           <input
                              className='form-control'
                              type='password'
                              ref={(input) => { this.password = input }}
                           />
                        </form>

                        <div className='d-flex justify-content-start my-3'>
                           <button onClick={this.onButtonClick} className='btn btn-warning'>Login</button>
                        </div>

                     </div>
                  </div>
               </div>
            </div>
         )

      }

      // Arahkan user yang telah login ke home
      return <Redirect to='/admin' />

   }
}

const mapStateToProps = state => {
   return {
      admin: state.admin_auth // {id, username}
   }
}

export default connect(mapStateToProps, { loginAdmin })(LoginAdmin)