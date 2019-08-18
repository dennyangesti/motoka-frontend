import React, { Component } from 'react'

class Contact extends Component {
   componentDidMount() {
      window.scrollTo(0, 0);
   }
   render() {

      return (
         <div id='contact'>
            <h1>Contact</h1>
            <p>Contact us LOREM</p>
         </div>
      )
   }
}

export default Contact