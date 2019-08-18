import React, { Component } from 'react'



class About extends Component {
   componentDidMount() {
      window.scrollTo(0, 0);
   }

   render() {
      return (
         <div id='about'>
            <div className='pb-3' style={{ backgroundColor: 'black' }}>
               <div className='justify-content-center d-flex'>
                  <img className='img-fluid' src={require('../../../image/logo/motoka1.png')} width='150' alt='' />
               </div>
               <div className='text-center text-white'>
                  <h4 className='p-0 m-0 mt-2'>Welcome to, </h4>
                  <h1>GETMotoka Indonesia</h1>
               </div>
            </div>
            <div className='container mt-2'>
               <div className='row'>
                  <div className='col-12'>
                     <h1 className='text-center'>Company Profile</h1>
                  </div>
               </div>
               <div className='row'>
                  <div className='col-6'>
                     <p>Founded in 2019, Motoka is based in West Jakarta, Indonesia. We offer the easiest way to buying anything that you need for your car or motorcycles, loremipsum </p>
                  </div>
                  <div className='col-6'>
                     <p>Not only that, we also provide fashion and accessories for your car and motorcycles, we ship what you need just by request. With our experience engineer, you can also installed it here, or you just can ask any suggestion from our engineers. loremipsum</p>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default About