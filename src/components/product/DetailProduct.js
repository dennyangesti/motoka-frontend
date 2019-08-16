import React, { Component } from 'react'
import axios from 'axios'

import Header from '../header/Header'
import Footer from '../Footer'

class DetailProduct extends Component {

   state = {
      product: {
         id: '',
         name: '',
         price: '',
         src: ''
      }
   }

   componentDidMount() {
      let pro_id = this.props.match.params.product_id

      axios.get(
         "http://localhost:2019/products/" + pro_id)

         .then(res => {
            this.setState({
               product: res.data
            })
         })

      window.scrollTo(0, 0);
   }

   render() {
      // var { name, desc, price, src } = this.state.product

      // this.props.match.params.product_id
      // /detailproduct/:product_id -> definisi
      // /detailproduct/78 -> menggunakan
      return (
         // <div className='card col-6 mt-5 mx-auto'>
         //    <img className='card-img-top' src={src} />
         //    <div className='card-body'>
         //       <h3 className='card-title'>{name}</h3>
         //       <p className='card-text'>{desc}</p>
         //       <p className='card-text'>Rp.{price}/hr</p>
         //       <form className="input-group my-3"><input ref={input => this.name = input} className="form-control" defaultValue="0" type="number" /></form>
         //       <button className='btn btn-primary'>Add To Cart</button>
         //    </div>
         // </div>
         <div>
            <Header />
            <div className='card col-6 ml-3 mb-3 border-0' style={{ marginTop: '60px' }}>
               <img className='card-img-top' src={"http://www.hdcarwallpapers.com/thumbs/2018/mclaren_720s_pacific_theme_2018_4k_8k-t2.jpg"} alt='' />
            </div>
            <div>
            </div>
            <Footer />
         </div>
      )
   }
}

export default DetailProduct 