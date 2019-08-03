import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Footer extends Component {
   render() {
      return (
         <div style={{ backgroundColor: 'black' }}>
            <div className='container text-secondary mt-0'>
               <div className='row'>
                  <div className='col-5 p-0 py-4'>
                     <h4 className='text-uppercase font-weight-bold'>Shop</h4>
                     <div className="list-group h6 font-weight-light">
                        <Link to='/category'><p className='text-secondary'>Shop by car</p></Link>
                        <Link to='/category'><p className='text-secondary'>Shop by motorcycle</p></Link>
                        <Link to='/category'><p className='text-secondary'>Shop by accessories</p></Link>
                        <Link to='/category'><p className='text-secondary'>New Arrivals</p></Link>
                        <Link to='/category'><p className='text-secondary'>On Sale</p></Link>
                     </div>
                  </div>
                  <div className='col-4 p-0 py-4'>
                     <h4 className='text-uppercase font-weight-bold'>Customer Service</h4>
                     <div className="list-group h6 font-weight-light">
                        <Link to='/contact'><p className='text-secondary'>Contact Us</p></Link>
                     </div>
                  </div>
                  <div className='col p-0 py-4 text-right'>
                     <h4 className='text-uppercase font-weight-bold'>Our Store</h4>
                     <div className="list-group h6 font-weight-light">
                        <Link to='/about'><p className='text-secondary'>About Us</p></Link>
                        <Link to='/location'><p className='text-secondary'>Store Location</p></Link>
                        <Link to='/shipping'><p className='text-secondary'>Shipping and Returns</p></Link>
                        <Link to='/terms'><p className='text-secondary'>Terms and Condition</p></Link>
                     </div>
                  </div>
               </div>
            </div>

            <div style={{ backgroundImage: 'url(https://i.ibb.co/VTTLGcZ/foot.png)', backgroundSize: 'cover', backgroundPosition: '50% 75%' }}>
               <div className='container text-white py-5 mt-1 mb-3'>

                  <div className='row'>

                     <div className='col-10 p-0 '>
                        <h6 className='p-0 font-weight-light'>Copyrights 2019 <span className='text-uppercase font-weight-bold text-danger'>Get</span><span className='text-uppercase'>Motoka</span></h6>
                        <h6 className='p-0 my-0 font-weight-light'>Design and developed by <span className='font-weight-normal'>Denny A. Pratama</span></h6>
                        <h6 className='p-0 font-weight-light'>For Purwadhika JC-09 Final Project</h6>
                     </div>

                     <div className='col p-0 text-right'>
                        <h6 className='p-0 font-weight-light mb-2 text-uppercase'>Social Media</h6>
                        <div className='row justify-content-end mt-3'>
                           <div className='col-3 p-0'>
                              <a href="https://www.facebook.com/dennyangesti"><img src="https://i.ibb.co/Lh6tZrv/facebook-1.png" alt="facebook-1" /></a>
                           </div>
                           <div className='col-6 text-center p-0'>
                              <a href='https://github.com/dennyangesti'><img src="https://i.ibb.co/JQ0K1g8/github-1.png" alt="github-1" /></a>
                           </div>
                           <div className='col-3 text-left p-0'>
                              <a href='mailto:dennyangesti@gmail.com'><img src="https://i.ibb.co/bHgWh4v/google-plus-1.png" alt="google-plus-1" /></a>
                           </div>
                        </div>

                        <div className='row mt-3'>
                           <div className='col-3 p-0'>
                              <a href="https://www.instagram.com/dennyangesti"><img src="https://i.ibb.co/dQt6wyd/instagram-1.png" alt="instagram-1" /></a>
                           </div>
                           <div className='col-6 text-center p-0'>
                              <a href='https://www.linkedin.com/in/denny-angesti-5908522b/'><img src="https://i.ibb.co/WHttwB0/linkedin-1.png" alt="linkedin-1" /></a>
                           </div>
                           <div className='col- text-left p-0'>
                              <a href='https://wa.me/6281287770007'><img src="https://i.ibb.co/WDhYjVH/whatsapp-1.png" alt="whatsapp-1" /></a>
                           </div>
                        </div>

                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default Footer