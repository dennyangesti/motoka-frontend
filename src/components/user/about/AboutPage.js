import React, { Component } from 'react'

import Header from '../../user/header/Header'
import Footer from '../../Footer'

import About from '../about/About'
import Contact from '../about/Contact'
import Store from '../about/Store'
import BrandCar from '../../user/about/BrandCar'
import BrandMoto from '../../user/about/BrandMoto'

class AboutPage extends Component {
   componentDidMount() {
      window.scrollTo(0, 0);
   }

   render() {
      return (
         <div>
            <Header />
            <div className='container' style={{ marginTop: 58 }}>
               <About />
               <BrandCar />
               <Store />
               <BrandMoto />
               <Contact />
            </div>
            <Footer />
         </div>
      )
   }
}

export default AboutPage