import React, { Component } from 'react'

class Subscribe extends Component {

   render() {

      return (
         <div className='container-fluid text-center text-uppercase text-white mb-1' style={{ backgroundImage: 'url(https://i.ibb.co/qdtFZG2/subs-1.png)', backgroundSize: 'cover', backgroundPosition: '50% 65%', backgroundRepeat: 'no-repeat', padding: '80px' }}>
            <div className='row'>
               <div className='col'>
                  <h1>Stay <span className='text-danger font-weight-bold'>Updated</span>, Receive <span className='text-danger font-weight-bold mb-3'>Special</span> Price</h1>
                  <h5>Sign up to get the latest news and offers</h5>
               </div>
            </div>
            <div className='row'>
               <div className='col'>
                  <form action="https://formspree.io/dennyangesti@gmail.com" method="POST">
                     <input type="text" name="name" placeholder=" Name" className='mr-3' />
                     <input type="email" name="_replyto" placeholder=" Email" className='mr-3' />
                     <input type="submit" value="Subscribe" className="btn btn-danger text-white px-3 pt-1" />
                  </form>
               </div>
            </div>
         </div>
      )
   }
}

export default Subscribe