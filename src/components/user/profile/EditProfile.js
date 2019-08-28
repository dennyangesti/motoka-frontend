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
               <div className='container '>
                  <div className='mb-4' style={{ marginTop: 80 }}>
                     <div class="card text-center">
                        <div class="card-header">Edit Profile</div>
                        <div class="card-body">
                           <h5 class="card-title">

                              <div className="input-group mb-2">
                                 <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Name: </span>
                                 </div>
                                 <input type="text" className="form-control" defaultValue={this.props.user.first_name.concat(' ' + this.props.user.last_name)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled />
                              </div>

                              <div className="input-group mb-3">
                                 <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">@</span>
                                 </div>
                                 <input type="text" className="form-control" defaultValue={this.props.user.username} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled />
                              </div>

                           </h5>

                           <form>

                              <p class="card-text mb-2">
                                 <div className="input-group">
                                    <div className="input-group-prepend">
                                       <span className="input-group-text" id="inputGroup-sizing-default">First Name: </span>
                                    </div>
                                    <input type="text" className="form-control" defaultValue={this.props.user.first_name} placeholder='*First Name' ref={(firstName) => { this.firstName = firstName }} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                                 </div>
                              </p>

                           </form>
                           <form>
                              <p class="card-text mb-2">
                                 <div className="input-group">
                                    <div className="input-group-prepend">
                                       <span className="input-group-text" id="inputGroup-sizing-default">Last Name: </span>
                                    </div>
                                    <input type="text" className="form-control" defaultValue={this.props.user.last_name} placeholder='Last Name' ref={(lastName) => { this.lastName = lastName }} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                                 </div>
                              </p>
                           </form>
                           <form>
                              <p class="card-text mb-2">
                                 <div className="input-group">
                                    <div className="input-group-prepend">
                                       <span className="input-group-text" id="inputGroup-sizing-default">Email: </span>
                                    </div>
                                    <input type="text" className="form-control" defaultValue={this.props.user.email} ref={(email) => { this.email = email }} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                                 </div>
                              </p>
                           </form>
                           <form>
                              <p class="card-text mb-2">
                                 <div className="input-group">
                                    <div className="input-group-prepend">
                                       <span className="input-group-text" id="inputGroup-sizing-default">Address: </span>
                                    </div>
                                    <input type="text" className="form-control" defaultValue={this.props.user.address} ref={(address) => { this.address = address }} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                                 </div>
                              </p>

                           </form>
                           <form>
                              <div class="input-group mb-3">
                                 <div class="input-group-prepend">
                                    <label class="input-group-text" for="inputGroupSelect01">Gender: </label>
                                 </div>
                                 <select class="custom-select" id="inputGroupSelect01" ref={input => this.gender = input} defaultValue={this.props.user.gender}>>
                              <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                 </select>
                              </div>
                           </form>
                           <button className='btn btn-danger mt-3 btn-block' onClick={this.onEditProfile}>Update Profile</button>
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