import React, { Component } from 'react'

class Contact extends Component {
   componentDidMount() {
      window.scrollTo(0, 0);
   }
   render() {

      return (
         <div style={{ marginTop: '50px' }}>
            <h1>Contact</h1>
         </div>
      )
   }
}

export default Contact