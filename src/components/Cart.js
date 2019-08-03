import React, { Component } from 'react'
import axios from "axios";
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

import Checkout from './Checkout'


class Cart extends Component {

   state = {
      cart: [],
      selectedId: 0,
      checkout: false
   }

   componentDidMount() {
      this.getCart()
      window.scrollTo(0, 0);

   }

   getCart = () => {
      axios.get(
         'http://localhost:2019/Cart',
         {
            params: {
               userID: this.props.user.id
            }
         }

      ).then(res => {
         this.setState({
            cart: res.data,
            selectedId: 0
         })
      })
   }

   onSaveCart = item => {
      const qty = this.editJumlah.value

      axios.patch(
         'http://localhost:2019/Cart/' + item.id,
         { quantity: qty }

      ).then(res => {
         this.getCart()

      }).catch(err => {
         console.log('Error')
      })
   }

   onDeleteCart = (item) => {
      const ID = item.id

      axios.delete('http://localhost:2019/Cart/' + ID)

         .then(res => {
            this.getCart()
            console.log(res)
         })
   }

   onCheckout = () => {
      this.setState({ checkout: true })
   }

   renderList = () => {

      return this.state.cart.map(item => {
         if (item.id !== this.state.selectedId) {
            return (
               <tr>
                  <td>{item.productName}</td>
                  <td>IDR. {item.productPrice.toLocaleString()}</td>
                  <td>{item.quantity}</td>
                  <td>IDR. {(item.productPrice * item.quantity).toLocaleString()}</td>
                  <td>
                     <img src={item.inputGambar} className='card-img-top' alt='' style={{ width: "70px" }}></img>
                  </td>
                  <td>
                     <button onClick={() => { this.setState({ selectedId: item.id }) }} className='btn btn-primary'>Edit</button>
                     <button className='btn btn-danger' onClick={() => { this.onDeleteCart(item) }}>Delete</button>
                  </td>
               </tr>
            )

         } else {
            return (
               <tr>
                  <td>{item.productName}</td>
                  <td>{item.productPrice.toLocaleString()}</td>
                  <td><input className="form-control" ref={input => { this.editJumlah = input }} type="text" defaultValue={item.quantity} /></td>
                  <td>{(item.productPrice * item.quantity).toLocaleString()}</td>
                  <td>
                     <img src={item.inputGambar} className='card-img-top' alt='' style={{ width: "70px" }}></img>
                  </td>
                  <td>
                     <button onClick={() => { this.onSaveCart(item) }} className='btn btn-primary'>Save</button>
                     <button onClick={() => { this.setState({ selectedId: 0 }) }} className='btn btn-warning'>Cancel</button>
                  </td>
               </tr>
            )
         }
      })
   }

   render() {
      if (this.props.user.username !== '') {
         if (this.state.checkout) {
            return (
               <div className="container">
                  <h1 className="display-4 text-center">{this.props.user.username}'s Cart Summary</h1>
                  <div className="d-flex justify-content-center mb-5">
                     <Link to="/">
                        <button className="btn btn-outline-success">Continue Shopping</button>
                     </Link>
                  </div>
                  <table className="table table-hover mb-5">
                     <thead>
                        <tr>
                           <th scope="col">NAME</th>
                           <th scope="col">PRICE</th>
                           <th scope="col">HOUR</th>
                           <th scope="col">TOTAL</th>
                           <th scope="col">PICTURE</th>
                           <th scope="col">ACTION</th>
                        </tr>
                     </thead>
                     <tbody>
                        {this.renderList()}
                     </tbody>
                  </table>

                  <div className="d-flex justify-content-center mb-5">
                     <button onClick={() => { this.onCheckout() }} className="btn btn-outline-success">Checkout</button>
                  </div>
                  <Checkout listCart={this.state.cart} />

               </div >

            )
         } else {
            return (
               <div className="container">
                  <h1 className="display-4 text-center">{this.props.user.username}'s Cart Summary</h1>
                  <div className="d-flex justify-content-center mb-5">
                     <Link to="/">
                        <button className="btn btn-outline-success">Continue Shopping</button>
                     </Link>
                  </div>
                  <table className="table table-hover mb-5">
                     <thead>
                        <tr>
                           <th scope="col">NAME</th>
                           <th scope="col">PRICE</th>
                           <th scope="col">HOUR</th>
                           <th scope="col">TOTAL</th>
                           <th scope="col">PICTURE</th>
                           <th scope="col">ACTION</th>
                        </tr>
                     </thead>
                     <tbody>
                        {this.renderList()}
                     </tbody>
                  </table>

                  <div className="d-flex justify-content-center mb-5">
                     <button onClick={() => { this.onCheckout() }} className="btn btn-outline-success">Checkout</button>
                  </div>

               </div >
            )
         }
      }
      return <Redirect to='/login'></Redirect>
   }
}

const mapStateToProps = state => {
   return {
      user: state.auth // id dan username
   }
}

export default connect(mapStateToProps)(Cart)