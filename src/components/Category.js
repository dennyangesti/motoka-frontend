import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
   Card, CardImg, CardText, CardBody,
   CardTitle, Button
} from 'reactstrap';

class Category extends Component {
   componentDidMount() {
      window.scrollTo(0, 0);
   }

   renderList = () => {
      return (
         <div className="card col-3 border-0 img-thumbnail text-center" style={{ marginTop: '60px' }}>
            <Link to='/detailproduct'><img src={"http://www.hdcarwallpapers.com/thumbs/2018/mclaren_720s_pacific_theme_2018_4k_8k-t2.jpg"} className='card-img-top w-100' alt='' /></Link>
            <div className='card-body'>
               <h5 className='card-title'>McLaren</h5>
               <p className='card-text'>Rp. 1.200.000.000</p>
               <button className='btn btn-danger btn-block' onClick={() => { this.addToCart(this.props.product) }} >Add To Cart</button>
            </div>
         </div>
      )
   }

   render() {
      return (
         <div>
            <div className='ml-3 sticky-top'>
               <div className="row" >
                  <div className="col">
                     <div className='mb-5' style={{ marginTop: '60px' }}>
                        <div className="mx-auto card">
                           <div className="card-body">
                              <div className="border-bottom border-secondary card-title">
                                 <h1>Search</h1>
                              </div>
                              <div className="card-title mt-1">
                                 <h4>Name</h4>
                              </div>
                              <form onSubmit={enter => this.onEnter(enter)} className="input-group"><input ref={input => this.name = input} className="form-control" type="text" /></form>
                              <div className="card-title mt-1">
                                 <h4>Price</h4>
                              </div>
                              <form onSubmit={enter => this.onEnter(enter)} className="input-group"><input placeholder="Minimum Price" type="text" ref={input => this.min = input} className="form-control mb-2" type="text" /></form>
                              <form onSubmit={enter => this.onEnter(enter)} className="input-group"><input placeholder="Maximum Price" type="text" ref={input => this.max = input} className="form-control" type="text" /></form>
                              <button onClick={this.onBtnSearch} className="btn btn-outline-secondary btn-block mt-5">Search</button>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="row col-10">
                     {this.renderList()}
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default Category