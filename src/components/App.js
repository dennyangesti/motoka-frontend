import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import cookies from 'universal-cookie'
import { connect } from 'react-redux'

import Home from './home/Home'
import Login from './auth/Login'
import Register from './auth/Register'
import ManageProduct from './admin/manageproducts/ManageProduct'
import DetailProduct from './product/DetailProduct'
import Cart from './transaction/Cart'
import Category from './home/Category'
import Brand from './about/Brand'
import About from './about/About'
import Contact from './about/Contact'

import Admin from './admin/Admin'
import LoginAdmin from './admin/auth/LoginAdmin'

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
         return this.props.keepLogin(objCookieUser)

      }

      if (objCookieAdmin !== undefined) {
         //Login ulang
         return this.props.keepLogin(objCookieAdmin)

      }
   }

   render() {
      return (
         <BrowserRouter>
            <div>
               <Route path="/" exact component={Home} /> {/* equal, ===, keyword exact  */}
               <Route path="/register" component={Register} /> {/* include()  */}
               <Route path="/login" component={Login} /> {/* include()  */}
               <Route path='/category' component={Category} />
               <Route path="/manageproduct" component={ManageProduct} /> {/* include()  */}
               <Route path="/detailproduct" component={DetailProduct} />
               {/* <Route path="/detailproduct/:product_id" component={DetailProduct} /> */}
               <Route path="/cart" component={Cart} />
               <Route path='/brand' component={Brand} />
               <Route path='/about' component={About} />
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