import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'

class ProductItem extends Component {
   state = {
      redirect: false
   }

   fnRedirect = () => {
      this.setState({
         redirect: true
      })
   }

   renderRedirect = () => {
      if (this.state.redirect) {
         return <Redirect to='/login' />
      }
   }

   addToCart = () => {
      const users_id = this.props.user.id
      const quantity = parseInt(this.quantity.value)
      var { id, stock } = this.props.items


      if (quantity > 0 && users_id !== '') {
         axios.get(`http://localhost:2019/carts/${users_id}/${id}`
         ).then(res => {

            if (res.data.length > 0) {
               const dataQuantity = res.data[0]
               const totalQuantity = parseInt(dataQuantity.quantity) + (quantity)

               if (totalQuantity <= stock) {
                  axios.patch(`http://localhost:2019/carts/${dataQuantity.id}`,
                     {
                        quantity: totalQuantity

                     }).then(res => {
                        Swal.fire(
                           'Cart Updated!',
                           'Your cart has been updated',
                           'success'
                        )
                        console.log(res.data)
                     })
               } else {
                  Swal.fire({
                     type: 'error',
                     title: 'Oops...',
                     text: 'Sorry, this item SOLDOUT!'
                  })
               }
            } else {
               axios.post(`http://localhost:2019/carts`,
                  {
                     user_id: users_id,
                     product_id: id,
                     quantity: quantity

                  }).then(res => {
                     Swal.fire(
                        'New items added!',
                        'Your cart has been updated',
                        'success'
                     )
                     console.log(res.data)
                  })
            }
         })
      } else {
         if (users_id === '') {
            return (
               Swal.fire({
                  type: 'error',
                  title: 'Access Denied',
                  text: 'Please login before continue transaction'
               }),
               this.fnRedirect()
            )
         } else {
            Swal.fire({
               type: 'error',
               title: 'Error',
               text: 'Please input quantity'
            })
         }
      }
      return (
         this.quantity.value = 0
      )
   }

   render() {
      let { product_name, price, description, image } = this.props.items
      return (
         <div className="card my-5 text-white">
            <div className="row no-gutters">
               <div className="col-md-8">
                  <img src={`http://localhost:2019/products/avatar/${image}`} className="card-img" alt="..." />
               </div>
               <div className="col-md-4 bg-dark">
                  <div className="card-body">
                     <h5 className="card-title display-4 border-bottom">{product_name}</h5>
                     <p className="card-text">IDR. {price.toLocaleString('IN')}</p>
                     <p className="card-text"><small className="text-white">{description}</small></p>
                     <input className="form-control" ref={input => { this.quantity = input }} type="text" defaultValue='0' />
                     <button className='btn btn-danger btn-block' onClick={() => { this.addToCart(this.props.items) }}>Add to Cart</button>
                     {/* <button className='btn btn-outline-danger  btn-block text-white mt-4'>See Details</button> */}
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

const mapStateToProps = state => {
   return {
      user: state.auth
   }
}

export default connect(mapStateToProps)(ProductItem)