import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { registerUser } from '../../action';


class Register extends Component {

   onButtonClick = () => {

      const firstName = this.firstName.value
      const lastName = this.lastName.value
      const username = this.username.value
      const email = this.email.value
      const password = this.password.value
      const confirmPass = this.confirmPass.value
      const gender = this.gender.value
      const address = this.address.value
      const phoneNumber = this.phone.value
      const avatar = this.avatar.value

      // console.log(firstName)
      // console.log(lastName)
      // console.log(username)
      console.log(email)
      console.log(password)
      console.log(confirmPass)
      // console.log(gender)
      // console.log(address)
      // console.log(phoneNumber)
      // console.log(avatar)
      if (password === confirmPass) {
         registerUser(firstName, lastName, username, email, gender, phoneNumber, password, confirmPass)
      }


   }

   render() {
      return (
         <div style={{ backgroundImage: "url(http://www.hdcarwallpapers.com/walls/ford_gt_mk_ii_2019_5k_2-HD.jpg)", backgroundSize: 'cover', backgroundPosition: '65%' }}>
            <div className='mb-0 row' style={{ marginTop: "48px" }}>
               <div className='col-sm-8 mx-auto card mt-5 mb-5 shadow-lg' style={{ opacity: '0.9' }}>
                  <div className='card-body '>

                     <div className=' border-bottom border-secondary card-title'>
                        <h1>Personal Registration</h1>
                     </div>

                     <form>
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

                        {/* <form> */}
                        <label className='mt-2'>Gender:</label>
                        <div className="input-group mb-3">
                           <select className="custom-select" ref={(gender) => { this.gender = gender }} id="inputGroupSelect02">
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                           </select>
                        </div>
                        {/* </form> */}

                        {/* <form> */}
                        <div className="form-group">
                           <label htmlFor="address">Address:</label>
                           <textarea className="form-control" id="address" rows="3" placeholder='Enter Address' ref={(address) => { this.address = address }}></textarea>
                        </div>
                        {/* </form> */}

                        {/* <form> */}
                        <label>Phone number:</label>
                        <div className="input-group mb-3">
                           <div className="input-group-prepend">
                              <span className="input-group-text" id="phonenumber">+62</span>
                           </div>
                           <input type="text" className="form-control" placeholder="Enter phone number" ref={(phone) => { this.phone = phone }} />
                        </div>
                        {/* </form> */}

                        {/* <form> */}
                        <div className="form-group mt-3">
                           <label htmlFor="avatar">Avatar:</label>
                           <input type="file" className="form-control-file" id="avatar" ref={(photo) => { this.avatar = photo }} />
                        </div>
                     </form>

                     <div className='d-flex justify-content-start my-3 mt-5'>
                        <button onClick={this.onButtonClick} className='btn btn-danger'>Register</button>
                     </div>

                     <div className="mt-5 text-right">
                        <p>Already have an account? <br /><Link to="/login"> Login here!</Link></p>
                     </div>

                  </div>
               </div>
            </div>
         </div >
      )
   }
}

export default Register

