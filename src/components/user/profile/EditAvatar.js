import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { updateAvatar } from '../../../action/index'

import Header from '../header/Header'
import Footer from '../../Footer'

import defaultAvatar from '../../../image/logo/motoka-logo.png'



class ChangeAvatar extends Component {

   onUpdateAvatar = () => {
      const avatar = this.avatar.files[0]
      console.log(this.avatar.files)

      const id = this.props.user.id
      const objUser = this.props.user

      this.props.updateAvatar(id, avatar, objUser)
   }

   render() {
      if (this.props.user.username === '') {
         return (
            // <Redirect to='/' />
            <div>Loading</div>
         )
      } else {
         if (this.props.user.avatar === null) {
            return (
               <div>
                  <Header />
                  <div className='container'>
                     <div className="row my-4">
                        <div class="card col-sm-12 col-md-6 col-lg-7">
                           <div class="card-body">

                              <h2 className='mb-4'>Change Profile Picture</h2>

                              <img className='d-block img-thumbnail w-50 mb-5' src={defaultAvatar} alt="Profile Picture" />

                              <form>
                                 <div class="form-group">
                                    <input type="file" class="form-control-file" id="exampleFormControlFile1" ref={input => this.avatar = input} />
                                 </div>
                              </form>

                              <button className='btn btn-primary' onClick={this.onUpdateAvatar}>Update Profile Picture</button>

                           </div>
                        </div>
                     </div>
                  </div>
                  <Footer />
               </div>
            )
         } else {
            return (
               <div>
                  <Header />
                  <div className='container'>
                     <div className="row my-4">
                        <div class="card col-sm-12 col-md-6 col-lg-7">
                           <div class="card-body">

                              <h2 className='mb-4'>Change Profile Picture</h2>

                              <img className='d-block img-thumbnail w-50 mb-5' src={`http://localhost:2019/users/avatar/${this.props.user.avatar}`} alt="Profile Picture" key={new Date()} />

                              <form>
                                 <div class="form-group">
                                    <input type="file" class="form-control-file" id="exampleFormControlFile1" ref={input => this.avatar = input} />
                                 </div>
                              </form>

                              <button className='btn btn-primary' onClick={this.onUpdateAvatar}>Update Profile Picture</button>

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

}


const mapStateToProps = (state) => {
   return {
      user: state.auth
   }
}

export default connect(mapStateToProps, { updateAvatar })(ChangeAvatar)