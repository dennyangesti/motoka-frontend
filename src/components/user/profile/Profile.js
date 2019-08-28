import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, Button, CardTitle, CardText, Row, Col, CardImg } from 'reactstrap';

import Header from '../header/Header'
import Footer from '../../Footer'

import defaultAvatar from '../../../image/logo/motoka-logo.png'

class Profile extends Component {
   render() {
      if (this.props.user.username === '') {
         return (
            // <Redirect to='/login' />
            <div>Loading</div>
         )
      } else {
         if (this.props.user.avatar === null) {
            return (
               <div>
                  <Header />
                  <div className='container' style={{ marginTop: 80 }}>
                     <Row>
                        <Col sm="6">
                           <Card body>
                              <CardImg top width="100%" src={defaultAvatar} alt="Profile Picture" key={new Date()} />
                              <Link to='/editavatar'><Button color='danger' block>Edit Avatar</Button></Link>
                           </Card>
                        </Col>
                        <Col sm="6">
                           <Card body>
                              <CardTitle>
                                 <div className="input-group">
                                    <div className="input-group-prepend">
                                       <span className="input-group-text" id="inputGroup-sizing-default">Name: </span>
                                    </div>
                                    <input type="text" className="form-control" defaultValue={this.props.user.first_name.concat(' ' + this.props.user.last_name)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled />
                                 </div>
                              </CardTitle>
                              <CardText>
                                 <div className="input-group">
                                    <div className="input-group-prepend">
                                       <span className="input-group-text" id="inputGroup-sizing-default">@</span>
                                    </div>
                                    <input type="text" className="form-control" defaultValue={this.props.user.username} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled />
                                 </div>
                              </CardText>
                              <CardText>
                                 <div className="input-group">
                                    <div className="input-group-prepend">
                                       <span className="input-group-text" id="inputGroup-sizing-default">Email: </span>
                                    </div>
                                    <input type="text" className="form-control" defaultValue={this.props.user.email} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled />
                                 </div>
                              </CardText>
                              <CardText>
                                 <div className="input-group">
                                    <div className="input-group-prepend">
                                       <span className="input-group-text" id="inputGroup-sizing-default">Gender: </span>
                                    </div>
                                    <input type="text" className="form-control" defaultValue={this.props.user.gender} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled />
                                 </div>
                              </CardText>
                              <CardText>
                                 <div className="input-group">
                                    <div className="input-group-prepend">
                                       <span className="input-group-text" id="inputGroup-sizing-default">Address: </span>
                                    </div>
                                    <input type="text" className="form-control" defaultValue={this.props.user.address} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled />
                                 </div>
                              </CardText>
                              <Link to='/editprofile'><Button color='outline-danger mt-3' block>Edit Profile</Button></Link>
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
                              <CardImg top width="100%" src={`http://localhost:2019/users/avatar/${this.props.user.avatar}`} alt="Profile Picture" key={new Date()} />
                              <Link to='/editavatar'><Button color='danger' block>Edit Avatar</Button></Link>
                           </Card>
                        </Col>
                        <Col sm="6">
                           <Card body>
                              <CardTitle>
                                 <div className="input-group">
                                    <div className="input-group-prepend">
                                       <span className="input-group-text" id="inputGroup-sizing-default">Name: </span>
                                    </div>
                                    <input type="text" className="form-control" defaultValue={this.props.user.first_name.concat(' ' + this.props.user.last_name)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled />
                                 </div>
                              </CardTitle>
                              <CardText>
                                 <div className="input-group">
                                    <div className="input-group-prepend">
                                       <span className="input-group-text" id="inputGroup-sizing-default">@</span>
                                    </div>
                                    <input type="text" className="form-control" defaultValue={this.props.user.username} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled />
                                 </div>
                              </CardText>
                              <CardText>
                                 <div className="input-group">
                                    <div className="input-group-prepend">
                                       <span className="input-group-text" id="inputGroup-sizing-default">Email: </span>
                                    </div>
                                    <input type="text" className="form-control" defaultValue={this.props.user.email} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled />
                                 </div>
                              </CardText>
                              <CardText>
                                 <div className="input-group">
                                    <div className="input-group-prepend">
                                       <span className="input-group-text" id="inputGroup-sizing-default">Gender: </span>
                                    </div>
                                    <input type="text" className="form-control" defaultValue={this.props.user.gender} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled />
                                 </div>
                              </CardText>
                              <CardText>
                                 <div className="input-group">
                                    <div className="input-group-prepend">
                                       <span className="input-group-text" id="inputGroup-sizing-default">Address: </span>
                                    </div>
                                    <input type="text" className="form-control" defaultValue={this.props.user.address} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled />
                                 </div>
                              </CardText>
                              <Link to='/editprofile'><Button color='outline-danger mt-3' block>Edit Profile</Button></Link>
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

const mapStateToProps = state => {
   return {
      user: state.auth // id dan username
   }
}


export default connect(mapStateToProps)(Profile)