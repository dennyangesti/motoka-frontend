import React, { Component } from 'react'
import axios from 'axios'

import Header from '../header/Header'
import Footer from '../../Footer'
import ProductItem from './ProductItem';

class Product extends Component {

   state = {
      brandState: 0,
      productState: [],
      searchProduct: [],
   };


   toggle(tab) {
      if (this.state.activeTab !== tab) {
         this.setState({
            activeTab: tab
         });
      }
   }

   componentDidMount() {
      window.scrollTo(0, 0);

      this.getProduct()
   }


   getProduct = () => {
      axios.get('http://localhost:2019/products')
         .then(res => {
            this.setState({ productState: res.data, searchProduct: res.data })
            console.log(res.data);

         })
   }

   renderBrands = () => {
      return this.state.productState.map(item => {
         if (item.brand_id === this.state.brandState) {
            return (
               <ProductItem items={item} />
            )
         }

         if (this.state.brandState === 0) {
            return (
               <ProductItem items={item} />
            )
         }
      })
   }

   renderProduct = () => {
      return this.state.brandState.map(item => {
         return (
            <ProductItem item={item} />
         )
      })
   }

   renderList = () => {

      return (
         <div>
            <div className="row">
               {this.renderBrands()}
            </div>
         </div>
      );
   }

   render() {
      return (
         <div>
            <Header />
            <div className='container' style={{ marginTop: '80px' }}>
               <div className="row d-flex justify-content-between position-sticky mb-3">
                  <div onClick={() => this.setState({ brandState: 0, productState: this.state.searchProduct })}>
                     <h5 className="mt-2 text-secondary">All</h5>
                  </div>
                  <div onClick={() => this.setState({ brandState: 3 })}>
                     <img src={require('../../../image/logo/logo/fix/ferrari.png')} alt="Generic placeholder" width="35" height="35" />
                  </div>
                  <div onClick={() => this.setState({ brandState: 10 })}>
                     <img src={require('../../../image/logo/logo/fix/alfaromeo.png')} alt="Generic placeholder" width="35" height="35" />
                  </div>
                  <div onClick={() => this.setState({ brandState: 11 })}>
                     <img src={require('../../../image/logo/logo/fix/astonmartin.png')} alt="Generic placeholder" width="35" height="35" />
                  </div>
                  <div onClick={() => this.setState({ brandState: 12 })}>
                     <img src={require('../../../image/logo/logo/fix/audi.png')} alt="Generic placeholder" width="35" height="35" />
                  </div>
                  <div onClick={() => this.setState({ brandState: 13 })}>
                     <img src={require('../../../image/logo/logo/fix/buggati.png')} alt="Generic placeholder" width="35" height="35" />
                  </div>
                  <div onClick={() => this.setState({ brandState: 14 })}>
                     <img src={require('../../../image/logo/logo/fix/chevrolet.png')} alt="Generic placeholder" width="35" height="35" />
                  </div>
                  <div onClick={() => this.setState({ brandState: 15 })}>
                     <img src={require('../../../image/logo/logo/fix/honda.png')} alt="Generic placeholder" width="35" height="35" />
                  </div>
                  <div onClick={() => this.setState({ brandState: 16 })}>
                     <img src={require('../../../image/logo/logo/fix/lamborghini.png')} alt="Generic placeholder" width="35" height="35" />
                  </div>
                  <div onClick={() => this.setState({ brandState: 17 })}>
                     <img src={require('../../../image/logo/logo/fix/lotus.png')} alt="Generic placeholder" width="35" height="35" />
                  </div>
                  <div onClick={() => this.setState({ brandState: 18 })}>
                     <img src={require('../../../image/logo/logo/fix/mclaren.png')} alt="Generic placeholder" width="35" height="35" />
                  </div>
                  <div onClick={() => this.setState({ brandState: 19 })}>
                     <img src={require('../../../image/logo/logo/fix/mercedes.png')} alt="Generic placeholder" width="35" height="35" />
                  </div>
                  <div onClick={() => this.setState({ brandState: 20 })}>
                     <img src={require('../../../image/logo/logo/fix/nissan.png')} alt="Generic placeholder" width="35" height="35" />
                  </div>
                  <div onClick={() => this.setState({ brandState: 21 })}>
                     <img src={require('../../../image/logo/logo/fix/porsche.png')} alt="Generic placeholder" width="35" height="35" />
                  </div>
                  <div onClick={() => this.setState({ brandState: 22 })}>
                     <img src={require('../../../image/logo/logo/fix/landrover.png')} alt="Generic placeholder" width="35" height="35" />
                  </div>
                  <div onClick={() => this.setState({ brandState: 23 })}>
                     <img src={require('../../../image/logo/logo/fix/rollsroyce.png')} alt="Generic placeholder" width="35" height="35" />
                  </div>
                  <div onClick={() => this.setState({ brandState: 24 })}>
                     <img src={require('../../../image/logo/logo/fix/toyota.png')} alt="Generic placeholder" width="35" height="35" />
                  </div>
                  <div onClick={() => this.setState({ brandState: 26 })}>
                     <img src={require('../../../image/logo/logo/fix/bmw.png')} alt="Generic placeholder" width="35" height="35" />
                  </div>
               </div>
               {this.renderList()}
            </div>
            <Footer />
         </div>
      )
   }
}

export default Product
