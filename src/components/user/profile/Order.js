import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Card, CardBody, CardText, CardTitle, CardGroup, CardSubtitle } from 'reactstrap'
import Swal from 'sweetalert2'

import Header from '../header/Header'
import Footer from '../../Footer'

class Order extends Component {

   state = {
      checkout: [],
      product: [],
      orderdetail: [],
   };

   componentDidMount() {
      this.getCheckout()
      this.getProduct()
      this.getOrderDetail()
   }

   getCheckout = () => {
      let user_id = this.props.match.params.user_id

      axios.get(`http://localhost:2019/checkout/${user_id}`)
         .then(res => {
            this.setState({ checkout: res.data })
            console.log(res.data);
         })
   }

   getProduct = () => {
      axios.get('http://localhost:2019/products')
         .then(res => {
            this.setState({ product: res.data })
         })
   }

   getOrderDetail = () => {
      axios.get('http://localhost:2019/orderdetail')
         .then(res => {
            this.setState({ orderdetail: res.data })
         })
   }

   onSort = () => {
      const order = this.order.value
      const sequence = this.sequence.value

      console.log(order)
      console.log(sequence)

      axios.post(`http://localhost:2019/sortcheckout/${this.props.user.id}`,
         {
            order,
            sequence
         }).then(res => {
            this.setState({ checkout: res.data })
         })
   }

   onUpload = (id) => {
      const formData = new FormData()
      const invoice = this.image.files[0]

      formData.append('invoice', invoice)
      formData.append('id', id)

      axios.post('http://localhost:2019/checkoutinvoice', formData
      ).then(res => {
         Swal.fire(
            'Upload Success',
            'Invoice uploaded!',
            'success'
         )
         console.log(res.data);
         document.location.reload(true)
      })
   }

   renderCart = (id) => {
      return this.state.orderdetail.map(val => {
         if (id === val.checkout_id) {
            return this.state.product.map(item => {
               if (val.products_id === item.id) {
                  return (
                     <div className='container text-dark'>
                        <Card>
                           <CardBody>
                              <CardText>
                                 <img className='justify-content-center' style={{ width: 100, height: 75 }} src={`http://localhost:2019/products/avatar/${item.image}`} />
                              </CardText>
                           </CardBody>
                        </Card>
                        <Card>
                           <CardBody>
                              <CardTitle>{item.product_name}</CardTitle>
                              <CardText>{item.price}</CardText>
                              <CardText>{item.total_quantity}</CardText>
                           </CardBody>
                        </Card>
                        <Card>
                           <CardBody>
                              <CardTitle>Total Price</CardTitle>
                              <CardText>IDR {(item.price * val.total_quantity).toLocaleString('IN')}</CardText>
                           </CardBody>
                        </Card>
                     </div>
                  )
               }
            })
         }
      })
   }

   renderOrder = () => {
      return this.state.checkout.map(val => {
         if (val.order_status === 'Transaction Pending') {
            return (
               <div className='container mt-4 text-dark'>
                  <CardGroup >
                     <Card inverse color='warning'>
                        <CardBody>
                           <CardTitle><span className='h1'>{val.order_status}</span></CardTitle>
                           <CardSubtitle className='mb-3'>Please Complete Transaction</CardSubtitle>
                           <CardText>Created At : <span className='h5'>{val.created_at}</span></CardText>
                           <CardText>Updated At : <span className='h5'>{val.updated_at}</span></CardText>
                           <div className='border-top'>
                              <CardText className='mt-3'>Total Price:</CardText>
                           </div>
                           <CardText className='display-4'>IDR. {val.total_price.toLocaleString('IN')}</CardText>
                        </CardBody>
                     </Card>
                     {this.renderCart(val.id)}
                     <Card>
                        <CardBody className='text-center'>
                           <CardTitle className='display-4'>Transfer Receipt: </CardTitle>
                           <CardText>Transfer receipt not found!</CardText>

                           <input type='file' ref={input => { this.image = input }}></input>

                           <button class="btn btn-primary btn-sm mx-auto d-flex" onClick={() => { this.onUpload(val.id) }}>Upload Receipt</button>
                        </CardBody>
                     </Card>
                  </CardGroup>
               </div>
            )
         } else if (val.order_status === 'Transaction Paid') {
            return (
               <div className='container mt-4'>
                  <CardGroup >
                     <Card inverse color='primary'>
                        <CardBody>
                           <CardTitle><span className='h1'>{val.order_status}</span></CardTitle>
                           <CardSubtitle className='mb-3'>Transfer Receipt has been uploaded, Order will be processed</CardSubtitle>
                           <CardText>Created At : <span className='h5'>{val.created_at}</span></CardText>
                           <CardText>Updated At : <span className='h5'>{val.updated_at}</span></CardText>
                           <div className='border-top'>
                              <CardText className='mt-3'>Total Price:</CardText>
                           </div>
                           <CardText className='display-4'>IDR. {val.total_price.toLocaleString('IN')}</CardText>
                        </CardBody>
                     </Card>
                     {this.renderCart(val.id)}
                     <Card>
                        <CardBody>
                           <CardTitle className='display-4'>Transfer Receipt: </CardTitle>
                           <img className='ml-2' style={{ width: 400 }} alt='' src={`http://localhost:2019/checkout/invoice/${val.invoice}`} />
                        </CardBody>
                     </Card>
                  </CardGroup>
               </div>
            )
         } else if (val.order_status === 'Payment Completed') {
            return (
               <div className='container mt-4'>
                  <CardGroup >
                     <Card inverse color='success'>
                        <CardBody>
                           <CardTitle><span className='h1'>{val.order_status}</span></CardTitle>
                           <CardSubtitle className='mb-3'>Transaction Complete!</CardSubtitle>
                           <CardText>Created At : <span className='h5'>{val.created_at}</span></CardText>
                           <CardText>Updated At : <span className='h5'>{val.updated_at}</span></CardText>
                           <div className='border-top'>
                              <CardText className='mt-3'>Total Price:</CardText>
                           </div>
                           <CardText className='display-4'>IDR. {val.total_price.toLocaleString('IN')}</CardText>
                        </CardBody>
                     </Card>
                     {this.renderCart(val.id)}
                     <Card>
                        <CardBody>
                           <CardTitle>Transfer Receipt: </CardTitle>
                           <img className='ml-2' style={{ width: 200, height: 200 }} alt='' src={`http://localhost:2019/checkout/invoice/${val.invoice}`} />
                        </CardBody>
                     </Card>
                  </CardGroup>
               </div>
            )
         } else if (val.order_status === 'Payment Canceled') {
            return (
               <div className='container mt-4'>
                  <CardGroup >
                     <Card inverse color='danger'>
                        <CardBody>
                           <CardTitle><span className='h1'>{val.order_status}</span></CardTitle>
                           <CardSubtitle className='mb-3'>Transaction has ben declined!</CardSubtitle>
                           <CardText>Created At : <span className='h5'>{val.created_at}</span></CardText>
                           <CardText>Updated At : <span className='h5'>{val.updated_at}</span></CardText>
                           <div className='border-top'>
                              <CardText className='mt-3'>Total Price:</CardText>
                           </div>
                           <CardText className='display-4'>IDR. {val.total_price.toLocaleString('IN')}</CardText>
                        </CardBody>
                     </Card>
                     {this.renderCart(val.id)}
                     <Card>
                        <CardBody>
                           <CardTitle>Transfer Receipt: </CardTitle>
                           <input type='file' ref={input => { this.image = input }}></input>
                           <button class="btn btn-primary btn-lg btn-block" onClick={() => { this.onUpload(val.id) }}>Upload Receipt</button>
                        </CardBody>
                     </Card>
                  </CardGroup>
               </div>
            )
         }
      })
   }

   render() {
      return (
         <div>
            <Header />
            <div className='container mb-5' style={{ marginTop: 80 }}>
               <hr></hr>
               <h1><center>Order History</center></h1>
               <div className='row'>
                  <span className='col-1 text-center align-self-center'>Sort By : </span>
                  <div className='col-5'>
                     <select class="form-control" ref={input => this.order = input}>
                        <option value='created_at'>Created At</option>
                        <option value='updated_at'>Updated At</option>
                        <option value='order_status'>Status</option>
                     </select>
                  </div>
                  <div className='col-5'>
                     <select className='form-control' ref={input => this.sequence = input}>
                        <option>ASC</option>
                        <option>DESC</option>
                     </select>
                  </div>
                  <button className='btn btn-success' onClick={() => this.onSort()}>Filter</button>
               </div>
               <div>
                  {this.renderOrder()}
               </div>
            </div>
            <Footer />
         </div>
      )
   }
}

const mapStateToProps = state => {
   return {
      user: state.auth // id dan username
   }
}

export default connect(mapStateToProps)(Order)