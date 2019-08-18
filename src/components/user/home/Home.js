import React, { Component } from 'react'
import axios from 'axios'

import ProductItem from '../product/ProductItem'
import BrandCar from '../about/BrandCar';
import BrandMoto from '../about/BrandMoto';
import MainCarousel from './MainCarousel';
import Subscribe from '../home/Subcribe'

import Header from '../header/Header'
import Footer from '../../Footer'


class Home extends Component {
   state = {
      products: [],
      searchProducts: []
   }

   componentDidMount() {
      window.scrollTo(0, 0)
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
         <div>
            <Header />
            <div style={{ marginTop: '58px' }}>
               <MainCarousel />
               <BrandCar />
               <BrandMoto />
               <Subscribe />
            </div>
            <Footer />
         </div>
      );
   }
}


export default Home
