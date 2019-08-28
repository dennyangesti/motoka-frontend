import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from '../../../config/axios'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'

import Header from '../../user/header/Header'
import Footer from '../../Footer'


class Register extends Component {

   componentDidMount() {
      window.scrollTo(0, 0)
   }

   state = {
      register: false
   }

   onEnter = (action) => {
      action.preventDefault()
      this.onButtonClick()
   }

   onButtonClick = async () => {

      const first_name = this.firstName.value
      const last_name = this.lastName.value
      const username = this.username.value
      const email = this.email.value
      const password = this.password.value
      const confirmPass = this.confirmPass.value

      console.log(first_name)
      console.log(last_name)
      console.log(username)
      console.log(email)
      console.log(password)
      console.log(confirmPass)

      if (password !== confirmPass) {
         return (
            Swal.fire({
               type: 'error',
               title: 'Invalid, Password not match!',
               text: 'Password and Confirm Password must be the same',
            })
         )
      }

      try {
         const res = await axios.post('/register',
            {
               first_name: first_name,
               last_name: last_name,
               username: username,
               email: email,
               password: password
            })

         if (typeof (res.data) === 'string') {
            return (
               Swal.fire({
                  type: 'error',
                  title: 'Error 404',
                  text: res.data
               })
            )
         }

         if (typeof (res.data) === 'object') {
            Swal.fire(
               'Registration Success!',
               'Your account has been created',
               'success'
            )

            this.setState({ register: true })
         }
      } catch (err) {
         console.log(err)
         alert(err)
      }
   }

   render() {
      // Logged user, cannot access Register Page
      if (this.props.user.username !== '') {
         return <Redirect to='/' />
      }

      // Registered user, redirect to Login Page
      if (this.state.register === true) {
         return <Redirect to='/login' />
      }

      if (this.state.register === false || this.props.user.username === '') {
         return (
            <div>
               <Header />
               <div style={{ backgroundImage: "url(http://www.hdcarwallpapers.com/walls/ford_gt_mk_ii_2019_5k_2-HD.jpg)", backgroundSize: 'cover', backgroundPosition: '65%' }}>
                  <div className='mb-0 row w-50 mx-auto' style={{ marginTop: "48px" }}>
                     <div className='col-sm-8 mx-auto card mt-5 mb-5 shadow-lg' style={{ opacity: '0.9' }}>
                        <div className='card-body '>

                           <div className=' border-bottom border-secondary card-title text-center'>
                              <h1>Registration</h1>
                           </div>


                           <form onSubmit={this.onEnter}>
                              <label htmlFor='form-control'>Name:</label>
                              <div className="input-group">
                                 <input type="text" aria-label="First name" className="form-control" placeholder='First Name' ref={(firstName) => { this.firstName = firstName }} />
                                 <input type="text" aria-label="Last name" className="form-control" placeholder='Last Name' ref={(lastName) => { this.lastName = lastName }} />
                              </div>
                              {/* </form> */}

                              {/* <form> */}
                              <div className="form-group mt-2">
                                 <label htmlFor="inputUsername">Username:</label>
                                 <input type="text" className="form-control" id="inputUsername" placeholder="Enter Username" ref={(user) => { this.username = user }} />
                              </div>
                              {/* </form> */}

                              {/* <form> */}
                              <div className="form-group">
                                 <label htmlFor="exampleInputEmail1">Email:</label>
                                 <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter Email" ref={(email) => { this.email = email }} />
                                 <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                              </div>
                              {/* </form> */}
                              {/* <form> */}
                              <label htmlFor='form-control'>Password:</label>
                              <div className="input-group">
                                 <input type="password" aria-label="Password" className="form-control" placeholder='Enter Password' ref={(password) => { this.password = password }} />
                                 <input type="password" aria-label="Confirm Password" className="form-control" placeholder='Confirm Password' ref={(confirmpass) => { this.confirmPass = confirmpass }} />
                              </div>
                              <small id="passwordHelp" className="form-text text-muted">Please remember your own password and do not share to anyone else.</small>
                              {/* </form> */}
                           </form>


                           <div className='d-flex justify-content-start my-3 mt-5'>
                              <button onClick={this.onButtonClick} className='btn btn-danger w-100 '>Register</button>
                           </div>

                           <div className="mt-5 text-right">
                              <p>Already have an account? <br /><Link to="/login"> Login here!</Link></p>
                           </div>

                        </div>
                     </div>
                  </div>
               </div >
               <Footer />
            </div>
         )
      }

   }
}

const mapStateToProps = state => {
   return {
      user: state.auth
   }
}

export default connect(mapStateToProps)(Register)

