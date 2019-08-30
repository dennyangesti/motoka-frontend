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

   onSearch = () => {
      const name = this.valname.value
      const max = parseInt(this.max.value)
      const min = parseInt(this.min.value)

      var filterSearch = this.state.searchProduct.filter(item => {
         if (isNaN(min) && isNaN(max)) { // Search by Name
            return (
               item.product_name.toLowerCase().includes(name.toLowerCase())
            )
         } else if (isNaN(min)) { // Name and Max
            return (
               item.product_name.toLowerCase().includes(name.toLowerCase())
               &&
               item.price <= max
            )
         } else if (isNaN(max)) { // Name and Max
            return (
               item.product_name.toLowerCase().includes(name.toLowerCase())
               &&
               item.price >= min
            )
         } else if (item.price <= max && item.price >= min) {
            return (
               item.product_name.toLowerCase().includes(name.toLowerCase())
               &&
               (item.price <= max && item.price >= min)
            )
         }
      })

      this.setState({ productState: filterSearch })
   }

   onEnter = (enter) => {
      enter.preventDefault()

      this.onSearch()
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
            <div>
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
               <div className="row d-flex justify-content-between mb-3">
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
               <div>
                  <div class="input-group ">
                     <div class="input-group-prepend">
                        <span class="input-group-text bg-dark text-white" id="basic-addon1">Product Name</span>
                     </div>
                     <form onInput={enter => this.onEnter(enter)}>
                        <input type="text" class="form-control" ref={input => { this.valname = input }} placeholder="Search by Product Name" aria-describedby="basic-addon1" />
                     </form>
                     <div class="input-group-prepend">
                        <span class="input-group-text ml-2 bg-dark text-white" id="basic-addon1">Price</span>
                     </div>
                     <input type="text" class="form-control" ref={input => { this.min = input }} placeholder="Search by Min Price" aria-describedby="basic-addon1" />
                     <input type="text" class="form-control" ref={input => { this.max = input }} placeholder="Search by Max Price" aria-describedby="basic-addon1" />
                     <button className='btn btn-danger ml-2' onClick={this.onSearch}>Search</button>
                  </div>
                  {this.renderList()}
               </div>
            </div>
            <Footer />
         </div>
      )
   }
}

export default Product
