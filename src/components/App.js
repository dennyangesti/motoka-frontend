import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import cookies from 'universal-cookie'
import { connect } from 'react-redux'

import Home from './Home'
import Header from './Header'
import Login from './Login'
import Register from './Register'
import ManageProduct from './ManageProduct'
import DetailProduct from './DetailProduct'
import Cart from './Cart'
import Footer from './Footer'
import Category from './Category'
import Brand from './Brand'
import About from './About'
import Contact from './Contact'


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