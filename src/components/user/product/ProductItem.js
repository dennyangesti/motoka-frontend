import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ProductItem extends Component {
   render() {
      let { product_name, price, description, image } = this.props.items
      return (
         <div className="card my-5 text-white">
            <div className="row no-gutters">
               <div className="col-md-8">
                  <img src={`http://localhost:2019/products/avatar/${image}`} className="card-img" alt="..." />
               </div>
               <div className="col-md-4 bg-secondary">
                  <div className="card-body">
                     <h5 className="card-title display-4 border-bottom">{product_name}</h5>
                     <p className="card-text">IDR. {price.toLocaleString('IN')}</p>
                     <p className="card-text"><small className="text-muted">{description}</small></p>
                     <button className='btn btn-outline-danger btn-block text-white'>See Details</button>
                     <Link to={`/detailproduct/`}><button className='btn btn-danger btn-block'>Add to Cart</button></Link>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}


export default ProductItem