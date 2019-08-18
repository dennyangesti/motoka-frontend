import React, { Component } from 'react'

class Store extends Component {
   componentDidMount() {
      window.scrollTo(0, document.getElementById('store').offsetTop - 55);
   }
   render() {

      return (
         <div id='store'>
            <h1>Store</h1>
            <p>Our store are located lorem</p>
         </div>
      )
   }
}

export default Store