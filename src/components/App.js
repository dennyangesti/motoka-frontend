import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import cookies from 'universal-cookie'
import { connect } from 'react-redux'

import Home from './user/home/Home'
import Login from './user/auth/Login'
import Register from './user/auth/Register'
import Profile from './user/profile/Profile'
import EditProfile from './user/profile/EditProfile'
import EditAvatar from './user/profile/EditAvatar'
import Cart from './user/transaction/Cart'

import Product from './user/product/Product'
import AboutPage from './user/about/AboutPage'
import Contact from './user/about/Contact'

import Admin from './admin/Admin'
import LoginAdmin from './admin/auth/LoginAdmin'
import ManageProduct from './admin/manage/ManageProduct'
import ManageBrand from './admin/manage/ManageBrand'

import { keepLogin, keepLoginAdmin } from '../action/index'
import Checkout from './user/transaction/Checkout';


const cookie = new cookies()

class App extends Component {

   componentDidMount() {
      // Check cookie
      const objCookieUser = cookie.get('motokaUser') //{id, username} atau undefined
      const objCookieAdmin = cookie.get('motokaAdmin')

      window.scrollTo(0, 0);

      if (objCookieUser !== undefined) {
         //Login ulang
         this.props.keepLogin(objCookieUser)
      }

      if (objCookieAdmin !== undefined) {
         //Login ulang
         this.props.keepLoginAdmin(objCookieAdmin)
      }
   }

   render() {
      return (
         <BrowserRouter>
            <div>
               <Route path="/" exact component={Home} /> {/* equal, ===, keyword exact  */}
               <Route path="/register" component={Register} /> {/* include()  */}
               <Route path="/login" component={Login} /> {/* include()  */}
               <Route path='/product' component={Product} />
               <Route path="/profile" component={Profile} />
               <Route path="/editprofile" component={EditProfile} />
               <Route path="/editavatar" component={EditAvatar} />
               <Route path="/cart" component={Cart} />
               <Route path="/checkout" component={Checkout} />
               <Route path='/about' component={AboutPage} />
               <Route path='/contact' component={Contact} />
            </div>
            <div>
               <Route path='/admin' component={Admin} />
               <Route path='/admin/login' component={LoginAdmin} />
               <Route path="/manageproduct" component={ManageProduct} /> {/* include()  */}
               <Route path="/managebrand" component={ManageBrand} /> {/* include()  */}
            </div>
         </BrowserRouter>
      )
   }
}


export default connect(null, { keepLogin, keepLoginAdmin })(App)