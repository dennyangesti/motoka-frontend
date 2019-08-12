import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'



class Register extends Component {

   onButtonClick = () => {

      const firstName = this.firstName.value
      const lastName = this.lastName.value
      const user = this.username.value
      const email = this.email.value
      const pass = this.password.value
      const gender = this.gender.value
      const address = this.address.value
      const phone = this.phone.value
      const avatar = this.avatar.value

      console.log(firstName)
      console.log(lastName)
      console.log(user)
      console.log(email)
      console.log(pass)
      console.log(gender)
      console.log(address)
      console.log(phone)
      console.log(avatar)

      //GET, axios.get ; untuk mengambil data

      // axios.get(
      //    'http://localhost:2019/users',
      //    {
      //       params: {
      //          username: user
      //       }
      //    }

      // ).then((res) => {
      //    // Jika username ditemukan, array.length > 0
      //    if (res.data.length > 0) {
      //       console.log("Username sudah digunakan")
      //       alert('Username telah digunakan')

      //    } else {
      //       // Check data berdasarkan email
      //       axios.get(
      //          'http://localhost:2019/users',
      //          {
      //             params: {
      //                email: email
      //             }
      //          }

      //       ).then((res) => {
      //          // Jika email ditemukan, array.length > 0
      //          if (res.data.length > 0) {
      //             console.log("Email sudah digunakan")
      //             alert('Email telah digunakan')

      //          } else {
      //             // Jika username dan email tidak ditemukan
      //             // Post untuk menaruh data baru
      axios.post(
         'http://localhost:2019/users',
         {
            first_name: firstName,
            last_name: lastName,
            username: user,
            password: pass,
            email: email,
            phone_number: phone,
            gender: gender,
            address: address,
            avatar: avatar
         }

      ).then((res) => {
         alert('Account anda telah berhasil dibuat')
         console.log("Data Berhasil Ditangkap")
         console.log(res)

      }).catch((err) => {
         console.log("Data Gagal Ditangkap")
         console.log(err)

      })
      //          }
      //       })
      //    }

      // }).catch((err) => {
      //    console.log("Gagal Request");
      //    console.log(err);
      // })
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
                           <input type="password" aria-label="Password" className="form-control" placeholder='Enter Password' ref={(pass) => { this.password = pass }} />
                           <input type="password" aria-label="Confirm Password" className="form-control" placeholder='Confirm Password' ref={(confirmPass) => { this.confirmPassword = confirmPass }} />
                        </div>
                        <small id="passwordHelp" className="form-text text-muted">Please remember your own password and do not share to anyone else.</small>
                        {/* </form> */}

                        {/* <form> */}
                        <label className='mt-2'>Gender:</label>
                        <div className="input-group mb-3">
                           <select className="custom-select" ref={(gender) => { this.gender = gender }} id="inputGroupSelect02">
                              <option value="male">Male</option>
                              <option value="female">Female</option>
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

