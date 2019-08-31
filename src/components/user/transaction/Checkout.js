import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Card, CardBody, CardText, CardTitle, CardHeader } from 'reactstrap';

import Header from '../header/Header'
import Footer from '../../Footer'

class Checkout extends Component {
   state = {
      cart: [],
      user_cart: [],
      product: [],
      redirect: false
   }

   componentDidMount() {
      this.getCart()
      this.getProduct()
   }

   setRedirect = () => {
      this.setState({
         redirect: true
      })
   }

   getProduct = () => {
      axios.get(`http://localhost:2019/products`)
         .then(res => {
            this.setState({ product: res.data })
         })
   }

   getCart = () => {
      axios.get(`http://localhost:2019/carts`)
         .then(res => {
            this.setState({ cart: res.data })
            this.getUserCart()
         })
   }

   getUserCart = () => {
      const filterCart = this.state.cart.filter(cart => {
         if (cart.user_id === this.props.user.id) {
            console.log(cart)
            return cart
         }
      })

      this.setState({ user_cart: filterCart })
      console.log(filterCart)
   }

   renderCart = () => {
      return this.state.cart.map(cart => {
         if (cart.user_id === this.props.user.id) {
            return this.state.product.map(item => {
               if (cart.product_id === item.id) {
                  return (
                     <div className='col d-flex justify-content-between'>
                        <CardTitle>{item.product_name}</CardTitle>
                        <CardText>IDR {(cart.quantity * item.price).toLocaleString('IN')}</CardText>
                     </div>
                  )
               }
            })
         }
      })
   }

   onTotal = () => {
      let subTotal = 0

      for (let i = 0; i < this.state.cart.length; i++) {
         if (this.state.cart[i].user_id === this.props.user.id) {
            for (let x = 0; x < this.state.product.length; x++) {
               if (this.state.cart[i].product_id === this.state.product[x].id) {
                  const total = this.state.cart[i].quantity * this.state.product[x].price
                  subTotal += total

               }
            }
         }
      }

      return subTotal
   }

   onCheckout = async () => {
      const total_price = this.onTotal()
      const user_id = this.props.user.id


      console.log(total_price)

      const order = await axios.post(`http://localhost:2019/checkout`,
         {
            user_id,
            total_price
         })

      console.log(order)

      let arrCart = []
      let carts = this.state.user_cart

      console.log(carts)

      for (let i = 0; i < carts.length; i++) {
         arrCart.push([carts[i].product_id, carts[i].quantity, order.data[0].id])
      }

      console.log(arrCart)

      const orderDetail = await axios.post(`http://localhost:2019/orderdetail`, { arrCart })

      console.log(orderDetail)

      await axios.delete(`http://localhost:2019/carts/${this.props.user.id}`)

      this.setRedirect()
   }

   renderRedirect = () => {
      if (this.state.redirect) {
         return <Redirect to='/' />
      }
   }


   render() {
      console.log(this.onTotal)
      return (
         <div style={{backgroundImage: "url(http://www.hdcarwallpapers.com/walls/2019_ssc_tuatara_4k-HD.jpg)", backgroundSize: 'cover', backgroundPosition: '78%'}}>
            <Header />
            <div className='container mb-5' style={{ marginTop: 88  }}>
               <div className="w-50 mx-auto" style={{ opacity: 0.9 }}>
                  <Card body className='mb-3'>
                  <CardText className='text-center display-4'>Cart</CardText>
                  </Card>
                  <Card body>
                     <CardBody>
                        <CardTitle>Your Item: </CardTitle>
                        {this.renderCart()}
                        <div className='d-flex justify-content-between'>
                           <CardText>Total Price</CardText>
                           <CardText className='font-weight-bold'>
                              IDR {this.onTotal().toLocaleString('IN')}
                           </CardText>
                        </div>
                        <div>
                           <Button className="btn btn-danger text-white btn-md btn-block" onClick={() => this.onCheckout()}>Continue Order</Button>
                           {this.renderRedirect()}
                        </div>
                     </CardBody>
                  </Card>
               </div>
            </div>
            <Footer />
         </div>
      )
   }
}

const mapStateToProps = state => {
   return {
      user: state.auth
   }
}

export default connect(mapStateToProps)(Checkout)