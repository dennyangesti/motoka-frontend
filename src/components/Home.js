import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import ProductItem from './ProductItem'

import {
   Carousel,
   CarouselItem,
   CarouselControl,
   CarouselIndicators,
   CarouselCaption
} from 'reactstrap';

import Category from './Category';
import BrandCar from './BrandCar';
import BrandMoto from './BrandMoto';


const items = [
   {
      src: "https://i.ibb.co/wwFHQyX/c-1.png",
      // altText: 'Slide 1',
      // caption: 'Slide 1'
   },
   {
      src: 'https://i.ibb.co/vPJQMMw/c-2.png',
      // altText: 'Slide 2',
      // caption: 'Slide 2'
   },
   {
      src: 'https://i.ibb.co/HV26tz3/c-3.png',
      // altText: 'Slide 3',
      // caption: 'Slide 3'
   },
   {
      src: 'https://i.ibb.co/vJfHJR1/c-4.png',
      // altText: 'Slide 4',
      // caption: 'Slide 4'
   }
];


class Home extends Component {
   state = {
      products: [],
      searchProducts: []
   }

   // Carousel Start
   constructor(props) {
      super(props);
      this.state = { activeIndex: 0 };
      this.next = this.next.bind(this);
      this.previous = this.previous.bind(this);
      this.goToIndex = this.goToIndex.bind(this);
      this.onExiting = this.onExiting.bind(this);
      this.onExited = this.onExited.bind(this);
   }

   onExiting() {
      this.animating = true;
   }

   onExited() {
      this.animating = false;
   }

   next() {
      if (this.animating) return;
      const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
      this.setState({ activeIndex: nextIndex });
   }

   previous() {
      if (this.animating) return;
      const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
      this.setState({ activeIndex: nextIndex });
   }

   goToIndex(newIndex) {
      if (this.animating) return;
      this.setState({ activeIndex: newIndex });
   }
   // Carousel End

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
      const { activeIndex } = this.state;

      const slides = items.map((item) => {
         return (
            <CarouselItem
               onExiting={this.onExiting}
               onExited={this.onExited}
               key={item.src}>
               <img className="d-block w-100" src={item.src} alt={item.altText} />
               <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
         );
      });

      return (
         <div style={{ marginTop: '50px' }}>
            {/* Carousel Start */}
            <Carousel
               activeIndex={activeIndex}
               next={this.next}
               previous={this.previous}
            >
               <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
               {slides}
               <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
               <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
            {/* Carousel End */}

            {/* Brand - Car Start */}
            <BrandCar />
            {/* Brand - Car End */}

            {/* Category Start */}
            <Category />
            {/* Category End */}

            {/* Brand - Motorcycle Start */}
            <BrandMoto />
            {/* Brand - Motorcycle End */}

            {/* Subscribe start */}
            <div className='container-fluid text-center text-uppercase text-white mb-1' style={{ backgroundImage: 'url(https://i.ibb.co/qdtFZG2/subs-1.png)', backgroundSize: 'cover', backgroundPosition: '50% 65%', backgroundRepeat: 'no-repeat', padding: '80px' }}>
               <div className='row'>
                  <div className='col'>
                     <h1>Stay <span className='text-danger font-weight-bold'>Updated</span>, Receive <span className='text-danger font-weight-bold mb-3'>Special</span> Price</h1>
                     <h5>Sign up to get the latest news and offers</h5>
                  </div>
               </div>
               <div className='row'>
                  <div className='col'>
                     <form action="https://formspree.io/dennyangesti@gmail.com" method="POST">
                        <input type="text" name="name" placeholder=" Name" className='mr-3' />
                        <input type="email" name="_replyto" placeholder=" Email" className='mr-3' />
                        <input type="submit" value="Subscribe" className="btn btn-danger text-white px-3 pt-1" />
                     </form>
                  </div>
               </div>
            </div>
            {/* Subscribe end */}
         </div>
      );
   }
}


export default Home
