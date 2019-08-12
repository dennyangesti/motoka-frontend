import React, { Component } from 'react'
import axios from 'axios'

import ProductItem from '../product/ProductItem'
import Category from '../home/Category';
import BrandCar from '../home/BrandCar';
import BrandMoto from '../home/BrandMoto';
import MainCarousel from './MainCarousel';
import Subscribe from '../home/Subcribe'


class Home extends Component {
   state = {
      products: [],
      searchProducts: []
   }

   componentDidMount() {
      this.getProduct()
   }

   onBtnSearch = () => {
      const name = this.name.value
      const min = parseInt(this.min.value) // NaN
      const max = parseInt(this.max.value) // NaN

      var arrSearch = this.state.searchProducts.filter(item => {
         if (isNaN(min) && isNaN(max)) { // Search by Name
            return (
               item.name.toLowerCase().includes(name.toLowerCase())
            )
         } else if (isNaN(min)) { // Name and Max
            return (
               item.name.toLowerCase().includes(name.toLowerCase())
               &&
               item.price <= max
            )
         } else if (isNaN(max)) { // Name and Min
            return (
               item.name.toLowerCase().includes(name.toLowerCase())
               &&
               item.price >= min
            )
         } else {            // Name & Min & Max
            return (
               // Semua string itu mengandung string kosong (true)
               item.name.toLowerCase().includes(name.toLowerCase())
               &&
               item.price >= min
               &&
               item.price <= max
            )
         }
      })

      this.setState({ products: arrSearch })
   }

   getProduct = () => {
      axios.get('http://localhost:2019/products')
         .then(res => {
            this.setState({ products: res.data, searchProducts: res.data })
         })
   }

   renderList = () => {
      return this.state.products.map(item => { // {name, desc, ...}
         return (
            <ProductItem barang={item} />
         )
      })
   }

   onEnter = (enter) => {
      enter.preventDefault()

      this.onBtnSearch()
   }

   render() {
      return (
         <div style={{ marginTop: '50px' }}>
            <MainCarousel />
            <BrandCar />
            <Category />
            <BrandMoto />
            <Subscribe />
         </div>
      );
   }
}


export default Home
