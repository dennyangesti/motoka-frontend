import React, { Component } from 'react'

import Header from '../header/Header'
import Footer from '../Footer'

class Contact extends Component {
   componentDidMount() {
      window.scrollTo(0, 0);
   }
   render() {

      return (
         <div>
            <Header />
            <div style={{ marginTop: '25px' }}>
               <h1>Contact</h1>
            </div>
            <Footer />
         </div>
      )
   }
}

export default Contact