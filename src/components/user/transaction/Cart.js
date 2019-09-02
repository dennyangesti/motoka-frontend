import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

import Header from '../header/Header'
import Footer from '../../Footer'

class Cart extends Component {
   state = {
      cartState: [],
      productState: [],
      cartSubTotal: 0,
      cartTotal: 0
   }

   componentDidMount() {
      window.scrollTo(0, 0)
      this.getProduct()
      this.getCart()
   }

   getProduct = () => {
      axios.get('http://localhost:2019/products')
         .then(res => {
            this.setState({ productState: res.data })
            console.log(res.data);
         })
   }

   getCart = () => {
      axios.get('http://localhost:2019/carts')
         .then(res => {
            this.setState({ cartState: res.data })
            console.log(res.data);
         })
   }

   deleteCart = (id) => {
      axios.delete(`http://localhost:2019/carts/${id}`
      ).then(res => {
         console.log(res.data)
         this.getCart()
      })
   }

   addQuantity = (productState, cartState) => {
      const user_id = this.props.user.id
      const { product_id } = cartState
      const { stock } = productState


      axios.get(`http://localhost:2019/carts/${user_id}/${product_id}`
      ).then(res => {

         const totalQuantity = parseInt(res.data[0].quantity) + 1
         console.log(res.data)

         if (totalQuantity <= stock) {
            axios.patch(`http://localhost:2019/carts/${res.data[0].id}`,
               {
                  quantity: totalQuantity
               }).then(res => {
                  this.getCart()
                  console.log(res.data)
               })
         } else {
            Swal.fire({
               type: 'error',
               title: 'Our stock is not enough',
               text: `Sorry, our stock is only ${res.data[0].quantity} items`,
            })
         }
      })
   }

   minQuantity = (cartState) => {
      const user_id = this.props.user.id
      const { product_id } = cartState


      axios.get(`http://localhost:2019/carts/${user_id}/${product_id}`
      ).then(res => {
         const totalQuantity = parseInt(res.data[0].quantity) - 1
         console.log(res.data)

         if (totalQuantity === 0) {
            axios.delete(`http://localhost:2019/carts/${res.data[0].id}`,
               {
                  quantity: totalQuantity
               }).then(res => {
                  this.getCart()
                  console.log(res.data)
               })
         } else {
            axios.patch(`http://localhost:2019/carts/${res.data[0].id}`,
               {
                  quantity: totalQuantity
               }).then(res => {
                  this.getCart()
                  console.log(res.data)
               })
         }
      })
   }

   onTotal = () => {
      let subTotal = 0

      for (let i = 0; i < this.state.cartState.length; i++) {
         if (this.state.cartState[i].user_id === this.props.user.id) {
            for (let x = 0; x < this.state.productState.length; x++) {
               if (this.state.cartState[i].product_id === this.state.productState[x].id) {
                  const total = this.state.cartState[i].quantity * this.state.productState[x].price
                  subTotal += total

               }
            }
         }
      }

      return subTotal.toLocaleString('IN')
   }

   renderList = () => {
      return this.state.productState.map(item => {
         return this.state.cartState.map(cart => {
            if (cart.user_id === this.props.user.id) {
               if (item.id === cart.product_id) {
                  const total = item.price * cart.quantity
                  return (
                     <tr>
                        <td> <img src={`http://localhost:2019/products/avatar/${item.image}`} className="card-img" style={{ width: 200 }} alt="..." /></td>
                        <td>{item.product_name}</td>
                        <td>Rp. {item.price.toLocaleString('IN')}</td>
                        <td>
                           <img className='mr-3' src={require('../../../image/minus.png')} alt='minus' onClick={() => { this.minQuantity(cart) }} />
                           {cart.quantity}
                           <img className='ml-3' src={require('../../../image/plus.png')} alt='plus' onClick={() => { this.addQuantity(item, cart) }} />
                        </td>
                        <td>Rp. {total.toLocaleString("IN")}</td>
                     </tr>
                  )
               }
            }
         })
      })
   }

   render() {
      return (
         <div style={{ backgroundImage: "url(http://www.hdcarwallpapers.com/walls/ferrari_gtc4lusso_t-HD.jpg)", backgroundSize: 'cover', backgroundPosition: '65%' }}>
            <Header />
            <div className='container mb-5' style={{ marginTop: 88 }}>
               <Row style={{ opacity: '0.9' }}>
                  <Col sm="9">
                     <Card className='mb-3'>
                        <CardTitle className='display-4 m-1 p-1 text-uppercase text-center'>Cart</CardTitle>
                     </Card>
                     <Card>
                        <table class="table table-borderless text-center mt-3">
                           <thead>
                              <tr>
                                 <th scope="col">Image</th>
                                 <th scope="col">Name</th>
                                 <th scope="col">Price</th>
                                 <th scope="col">Quantity</th>
                                 <th scope="col">Total</th>
                              </tr>
                           </thead>
                           <tbody>

                              {this.renderList()}
                           </tbody>
                        </table>
                     </Card>
                  </Col>
                  <Col sm="3">
                     <Card body>
                        <CardTitle className='h2 border-bottom m-1 p-1 text-uppercase'>Total</CardTitle>
                        <div className='justify-content-between row m-1 p-1'>
                           <CardText>Sub-total</CardText>
                           <CardText>IDR {this.onTotal()}</CardText>
                        </div>
                        <Link to={`/checkout/${this.props.user.id}`}>
                           <Button className='btn btn-success w-100'>
                              Checkout
                           </Button>
                        </Link>

                     </Card>
                  </Col>
               </Row>
            </div>
            <Footer />
         </div >
      )
   }
}


const mapStateToProps = state => {
   return {
      user: state.auth
   }
}

export default connect(mapStateToProps)(Cart)