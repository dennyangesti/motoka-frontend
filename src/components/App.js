import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import cookies from 'universal-cookie'
import { connect } from 'react-redux'

import Home from './home/Home'
import Header from './header/Header'
import Login from './auth/Login'
import Register from './auth/Register'
import ManageProduct from './admin/manageproducts/ManageProduct'
import DetailProduct from './product/DetailProduct'
import Cart from './transaction/Cart'
import Footer from './Footer'
import Category from './home/Category'
import Brand from './about/Brand'
import About from './about/About'
import Contact from './about/Contact'


import { keepLogin } from '../action'

const cookie = new cookies()

class App extends Component {

   componentDidMount() {
      // Check cookie
      const objCookie = cookie.get('userName') //{id, username} atau undefined

      window.scrollTo(0, 0);

      if (objCookie !== undefined) {
         //Login ulang
         this.props.keepLogin(objCookie)

      }
   }

   render() {
      return (
         <BrowserRouter>
            <Header />
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
            <Footer />
         </BrowserRouter>
      )
   }
}

export default connect(null, { keepLogin })(App)