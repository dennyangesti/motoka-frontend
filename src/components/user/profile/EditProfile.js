import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Header from '../header/Header'
import Footer from '../../Footer'


import { editProfile } from '../../../action/index'


class EditProfile extends Component {

   onEditProfile = () => {
      const id = this.props.user.id
      const firstName = this.firstName.value
      const lastName = this.lastName.value
      const email = this.email.value
      const gender = this.gender.value
      const address = this.address.value

      this.props.editProfile(id, firstName, lastName, email, gender, address)
      console.log(this.address.value)
   }


   render() {

      if (this.props.user.username === '') {
         console.log(this.props.user.username)
         return (
            // <Redirect to='/' />
            <div>Loading</div>
         )
      } else {
         return (
            <div>
               <Header />
               <div className='container'>
                  <div className="row my-4">
                     <div class="card col-sm-12 col-md-6 col-lg-7">
                        <div class="card-body">
                           <h2 className='mb-4'>Edit Profile</h2>
                           <form>
                              <div className="input-group">
                                 <input type="text" className="form-control" defaultValue={this.props.user.first_name} placeholder='*First Name' ref={(firstName) => { this.firstName = firstName }} />
                                 <input type="text" className="form-control" defaultValue={this.props.user.last_name} placeholder='Last Name' ref={(lastName) => { this.lastName = lastName }} />
                              </div>

                              <form className='input-group mt-3'>
                                 <input className='form-control' placeholder='*Email' type="email" defaultValue={this.props.user.email}
                                    ref={(email) => { this.email = email }}></input>
                              </form>


                              <form className='input-group my-3'>
                                 <input className='form-control' placeholder='Address' defaultValue={this.props.user.address}
                                    ref={(address) => { this.address = address }}></input>
                              </form>

                              <div class="input-group mb-3">
                                 <select class="custom-select" id="inputGroupSelect01" ref={input => this.gender = input} defaultValue={this.props.user.gender}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                 </select>
                              </div>
                           </form>
                           <button className='btn btn-primary mt-3' onClick={this.onEditProfile}>Update Profile</button>
                        </div>
                     </div>
                  </div>
               </div>
               <Footer />
            </div>

         )
      }
   }
}


const mapStateToProps = (state) => {
   return {
      user: state.auth
   }
}

export default connect(mapStateToProps, { editProfile })(EditProfile)