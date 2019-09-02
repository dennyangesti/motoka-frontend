import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import cookies from 'universal-cookie'
import { connect } from 'react-redux'

import Login from './user/auth/Login'
import Register from './user/auth/Register'

import Profile from './user/profile/Profile'
import EditProfile from './user/profile/EditProfile'
import EditAvatar from './user/profile/EditAvatar'
import Order from './user/profile/Order'

import Cart from './user/transaction/Cart'
import Checkout from './user/transaction/Checkout'
import Confirmation from './user/transaction/Confirmation'

import Home from './user/home/Home'
import Product from './user/product/Product'
import AboutPage from './user/about/AboutPage'
import Contact from './user/about/Contact'

import Dashboard from './admin/Dashboard'
import LoginAdmin from './admin/auth/LoginAdmin'
import ManageProduct from './admin/manage/ManageProduct'
import ManageBrand from './admin/manage/ManageBrand'
import ManageOrder from './admin/manage/ManageOrder'

import { keepLogin, keepAdmin } from '../action/index'

const cookie = new cookies()

class App extends Component {

   componentDidMount() {
      // Check cookie
      const objCookieUser = cookie.get('motokaUser') //{id, username} atau undefined
      const objAdmin = cookie.get("Admin")

      window.scrollTo(0, 0);

      if (objCookieUser !== undefined) {
         //Login ulang
         this.props.keepLogin(objCookieUser)
      }

      if (objAdmin !== undefined) {
         //Login ulang
         this.props.keepAdmin(objAdmin)
      }
   }

   render() {
      return (
         <BrowserRouter>
            <Route path="/" exact component={Home} /> {/* equal, ===, keyword exact  */}
            <Route path="/register" component={Register} /> {/* include()  */}
            <Route path="/login" component={Login} /> {/* include()  */}

            <Route path="/profile" component={Profile} />
            <Route path="/editprofile" component={EditProfile} />
            <Route path="/editavatar" component={EditAvatar} />

            <Route path='/product' component={Product} />
            <Route path="/order/:user_id" component={Order} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout/:user_id" component={Checkout} />

            <Route path="/confirmation/:user_id" component={Confirmation} />
            <Route path='/about' component={AboutPage} />
            <Route path='/contact' component={Contact} />

            <Route path='/dashboard' component={Dashboard} />
            <Route path='/admin/login' component={LoginAdmin} />
            <Route path="/manageproduct" component={ManageProduct} /> {/* include()  */}
            <Route path="/managebrand" component={ManageBrand} /> {/* include()  */}
            <Route path="/manageorder" component={ManageOrder} />
         </BrowserRouter>
      )
   }
}


export default connect(null, { keepLogin, keepAdmin })(App)