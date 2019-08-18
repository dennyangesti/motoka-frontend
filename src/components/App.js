import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import cookies from 'universal-cookie'
import { connect } from 'react-redux'

import Home from './user/home/Home'
import Login from './user/auth/Login'
import Register from './user/auth/Register'
import EditProfile from './user/profile/EditProfile'
import DetailProduct from './user/product/DetailProduct'
import Cart from './user/transaction/Cart'
import Product from './user/home/Product'
import AboutPage from './user/about/AboutPage'
import Contact from './user/about/Contact'

import Admin from './admin/Admin'
import LoginAdmin from './admin/auth/LoginAdmin'
import ManageProduct from './admin/manageproducts/ManageProduct'

import { keepLogin, keepLoginAdmin } from '../action/index'


const cookie = new cookies()

class App extends Component {

   componentDidMount() {
      // Check cookie
      const objCookieUser = cookie.get('users') //{id, username} atau undefined
      const objCookieAdmin = cookie.get('admins')

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
               <Route path="/manageproduct" component={ManageProduct} /> {/* include()  */}
               <Route path="/detailproduct" component={DetailProduct} />
               <Route path="/editprofile" component={EditProfile} />
               {/* <Route path="/detailproduct/:product_id" component={DetailProduct} /> */}
               <Route path="/cart" component={Cart} />
               <Route path='/about' component={AboutPage} />
               <Route path='/contact' component={Contact} />
            </div>
            <div>
               <Route path='/admin' component={Admin} />
               <Route path='/admin/login' component={LoginAdmin} />
            </div>
         </BrowserRouter>
      )
   }
}


export default connect(null, { keepLogin, keepLoginAdmin })(App)