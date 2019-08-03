import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import cookies from 'universal-cookie'

import { onLoginUser } from '../action'

const cookie = new cookies()

class Login extends Component {

   // Bikin Function
   onButtonClick = () => {
      // Ambil data di text input
      // username dan password
      var user = this.username.value
      var pass = this.password.value

      // Tembak data ke database
      this.props.onLoginUser(user, pass)

   }

   render() {
      //    const mustache = require('../../src/image/mustache.png');

      if (this.props.user.username === '') {
         return (
            <div>
               <div className='mb-2 row' style={{ marginTop: "70px" }}>
                  <div className='col-sm-4 mx-auto card' style={{ backgroundColor: '' }}>
                     <div className='card-body'>

                        <div className=' border-bottom border-secondary card-title d-flex justify-content-center'>
                           <h1>Login Here</h1>
                        </div>

                        <div className='card-title d-flex justify-content-end mt-1'>
                           <h4>Username</h4>
                        </div>

                        <form className='input-group'>
                           <input
                              className='form-control'
                              type='text'
                              ref={(input) => { this.username = input }}
                           />
                        </form>

                        <div className='card-title d-flex justify-content-end mt-3'>
                           <h4>Password</h4>
                        </div>

                        <form className='input-group'>
                           <input
                              className='form-control'
                              type='password'
                              ref={(input) => { this.password = input }}
                           />
                        </form>

                        <div className='d-flex justify-content-start my-3'>
                           <button onClick={this.onButtonClick} className='btn btn-warning'>Login</button>
                        </div>

                        <div className="mt-5">
                           <p>New member? <br /><Link to="/register"> Create an Account here!</Link></p>
                        </div>

                     </div>
                  </div>
               </div>
            </div>
         )

      }

      // Arahkan user yang telah login ke home
      return <Redirect to='/' />

   }
}

const mapStateToProps = state => {
   return {
      user: state.auth // {id, username}
   }
}

export default connect(mapStateToProps, { onLoginUser })(Login)