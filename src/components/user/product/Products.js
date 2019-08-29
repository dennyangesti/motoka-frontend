import React, { Component } from 'react'
import axios from 'axios'

import Header from '../header/Header'
import Footer from '../../Footer'

import ProductItem from './ProductItem'
import BrandtItem from './BrandItem'


class Product extends Component {
   state = {
      brandState: [],
      productState: [],
      searchProduct: []
   }

   componentDidMount() {
      this.getProduct()
   }

   getProduct = () => {
      axios.get('http://localhost:2019/products')
         .then(res => {
            this.setState({ productState: res.data, searchProduct: res.data })
            console.log(res.data);

         })
   }

   getBrand = () => {
      axios.get('http://localhost:2019/brands')
         .then(res => {
            this.setState({ brandState: res.data, searchBrand: res.data})
            console.log(res.data);

         })
   }

   renderProduct = () => {
      return this.state.productState.map(item => {
         return (
            <ProductItem item={item} />
         )
      })
   }

   renderBrand = () => {
      return this.state.productState.map(item => {
         const newItem = this.state.productState.length - 3

         if (item.brand_id === this.state.brandState) {
            return (
               <ProductItem items={item} />
            )
         }
         if (item.id > newItem) {
            if (this.state.brandState === 0) {
               return (
                  <ProductItem items={item} />
               )
            }
         }
      })
   }

   renderBrandImage = () => {
      return
   }

   renderList = () => {
      return (
         <div className="row">
            {this.renderBrand()}
         </div>
      )
   }

   render() {
      if (this.state.products === null) {
         return <h1> L o a d i n g . . . </h1>
      }
      return (
         <div className="container">
            <div class="row mt-5">
               <div class="col-lg-4 text-center" onClick={() => this.setState({ brandState: 0, productState: this.state.searchProduct })}>
                  <img class="rounded-circle" src="https://images.unsplash.com/photo-1543364195-bfe6e4932397?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=401&q=80" alt="Generic placeholder" width="140" height="140" />
                  <h2 className="mt-2">All Product</h2>
               </div>
               <div class="col-lg-4 text-center" onClick={() => this.setState({ brandState: 1 })}>
                  <img class="rounded-circle" src="https://images.unsplash.com/photo-1563169372-eb64c121f9dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=361&q=80" alt="Generic placeholder" width="140" height="140" />
                  <h2 className="mt-2">Buah</h2>
               </div>
               <div class="col-lg-4 text-center" onClick={() => this.setState({ brandState: 2 })}>
                  <img class="rounded-circle" src="https://images.unsplash.com/photo-1559317996-d154e05c76fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80" alt="Generic placeholder" width="140" height="140" />
                  <h2 className="mt-2">Sayuran</h2>
               </div>
            </div>
            <hr></hr>
            <div class="input-group mb-3">
               <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">Nama Product</span>
               </div>
               <input type="text" class="form-control" ref={input => { this.nama = input }} placeholder="Masukan nama product disini" aria-describedby="basic-addon1" />
               <div class="input-group-prepend">
                  <span class="input-group-text ml-2" id="basic-addon1">Harga</span>
               </div>
               <input type="text" class="form-control" ref={input => { this.min = input }} placeholder="Masukan harga minimal product" aria-describedby="basic-addon1" />
               <input type="text" class="form-control" ref={input => { this.max = input }} placeholder="Masukan harga maximal product" aria-describedby="basic-addon1" />
               <button className='btn btn-success ml-2' onClick={this.onBtnSearch}>Search</button>
            </div>
            <hr></hr>
            <h1 className='text-center'>Products</h1>
            <br></br>
            {this.renderList()}
         </div>
      )
   }
}

export default Product