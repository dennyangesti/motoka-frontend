import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { loginUser } from '../../action'
import Header from '../header/Header'
import Footer from '../Footer'

import { InputGroup, InputGroupAddon, Button } from 'reactstrap'


class Login extends Component {

   constructor(props) {
      super(props)

      this.state = {
         hidden: true,
         password: ''
      }

      this.onPassword = this.onPassword.bind(this)
      this.toggleShow = this.toggleShow.bind(this)
   }

   onPassword(event) {
      this.setState({ password: event.target.value })
   }

   toggleShow() {
      this.setState({ hidden: !this.state.hidden })
   }

   componentDidMount() {
      window.scrollTo(0, 0)

      if (this.props.password) {
         this.setState({ password: this.props.password })
      }
   }

   onEnter = (action) => {
      action.preventDefault()
      this.onButtonClick()
   }


   // Bikin Function
   onButtonClick = () => {
      // Ambil data di text input
      // username dan password
      var user = this.username.value
      var pass = this.password.value

      // Tembak data ke database
      this.props.loginUser(user, pass)

   }

   render() {

      if (this.props.user.username === '') {
         return (
            <div>
               <Header />
               <div style={{ backgroundImage: "url(http://www.hdcarwallpapers.com/walls/super_sports_cars-HD.jpg)", backgroundSize: 'cover', backgroundPosition: '65%' }}>
                  <div className='mb-0 row mx-auto w-50' style={{ marginTop: "48px" }}>
                     <div className='col-sm-8 mx-auto card mt-5 mb-5 shadow-lg' style={{ opacity: '0.9' }}>
                        <div className='card-body'>

                           <div className=' border-bottom border-secondary card-title text-center'>
                              <h1>Login</h1>
                           </div>

                           <div className='card-title d-flex justify-content-start mt-1'>
                              <h4>Username</h4>
                           </div>

                           <form className='input-group' onSubmit={this.onEnter}>
                              <input
                                 className='form-control'
                                 type='text'
                                 ref={(input) => { this.username = input }}
                              />
                           </form>

                           <div className='card-title d-flex justify-content-start mt-3'>
                              <h4>Password</h4>
                           </div>

                           <form className='input-group' onSubmit={this.onEnter}>
                              <InputGroup>
                                 <input
                                    className='form-control'
                                    type={this.state.hidden ? 'password' : 'text'}
                                    value={this.state.password}
                                    onChange={this.onPassword}
                                    ref={(input) => { this.password = input }}
                                 />
                                 <InputGroupAddon addonType='prepend'>
                                    <Button onClick={this.toggleShow} className='p-1'>Show Password</Button>
                                 </InputGroupAddon>
                              </InputGroup>
                           </form>

                           <div className='d-flex justify-content-end my-3'>
                              <button onClick={this.onButtonClick} className='btn btn-primary w-100'>Login</button>
                           </div>

                           <div className="mt-5">
                              <p>New member? <br /><Link to="/register"> Create an Account here!</Link></p>
                           </div>

                        </div>
                     </div>
                  </div>
               </div >
               <Footer />
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

export default connect(mapStateToProps, { loginUser })(Login)