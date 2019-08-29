import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Card, Row, Col } from 'reactstrap';

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
                  <div className='container mb-5' style={{ marginTop: 80 }}>
                     <Row>
                        <Col sm="6">
                           <Card body>
                              <div className='text-center'>
                                 <img style={{ width: 350 }} src={defaultAvatar} alt="Profile Picture" key={new Date()} />
                              </div>
                           </Card>
                        </Col>
                        <Col sm="6">
                           <Card body>
                              <h5 class="card-title">Change Profile Picture</h5>
                              <form>
                                 <div class="form-group">
                                    <input type="file" class="form-control-file" id="exampleFormControlFile1" ref={input => this.avatar = input} />
                                 </div>
                              </form>
                              <button className='btn btn-primary' onClick={this.onUpdateAvatar}>Update Profile Picture</button>
                           </Card>
                        </Col>
                     </Row>
                  </div>
                  <Footer />
               </div>
            )
         } else {
            return (
               <div>
                  <Header />
                  <div className='container mb-5' style={{ marginTop: 80 }}>
                     <Row>
                        <Col sm="6">
                           <Card body>
                              <div className='text-center'>
                                 <img style={{ width: 350 }} src={`http://localhost:2019/users/avatar/${this.props.user.avatar}`} alt="Profile Picture" key={new Date()} />
                              </div>
                           </Card>
                        </Col>
                        <Col sm="6">
                           <Card body>
                              <h5 class="card-title">Change Profile Picture</h5>
                              <form>
                                 <div class="form-group">
                                    <input type="file" class="form-control-file" id="exampleFormControlFile1" ref={input => this.avatar = input} />
                                 </div>
                              </form>
                              <button className='btn btn-danger' onClick={this.onUpdateAvatar}>Update Profile Picture</button>
                           </Card>
                        </Col>
                     </Row>
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