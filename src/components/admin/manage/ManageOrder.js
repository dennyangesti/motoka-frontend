import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Button, Table } from 'reactstrap'


class ManageOrder extends Component {
   state = {
      checkout: [],
   }

   componentDidMount() {
      this.getCheckout()
   }

   getCheckout = () => {
      axios.get('http://localhost:2019/checkout')
         .then(res =>
            this.setState({ checkout: res.data })
         )
   }

   onConfirm = (id) => {
      axios.get(`http://localhost:2019/checkoutconfirm/${id}`)
         .then(
            document.location.reload(true),
            this.getCheckout()
         )
   }

   onDecline = (id) => {
      axios.delete(`http://localhost:2019/checkout/invoice/${id}`)
         .then(
            document.location.reload(true),
            this.getCheckout()
         )
   }

   renderOrder = (status) => {
      return this.state.checkout.map(val => {
         if (val.order_status === status) {
            return (
               <div className='mt-4'>
                  <Table bordered>
                     <thead>
                        <tr>
                           <th>User ID</th>
                           <th>Created at</th>
                           <th>Total Price</th>
                           <th>Order Receipt</th>
                           <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <th scope="row">{val.user_id}</th>
                           <td>{val.created_at}</td>
                           <td>IDR {val.total_price.toLocaleString('IN')}</td>
                           <td>
                              <img className='ml-2' style={{ width: 50 }} alt='' src={`http://localhost:2019/checkout/invoice/${val.invoice}`} />
                           </td>
                           <td>
                              <Button className='btn btn-success mx-3' onClick={() => this.onConfirm(val.id)}>Confirm</Button>
                              <Button className='btn btn-danger' onClick={() => this.onDecline(val.id)}>Decline</Button>
                           </td>
                        </tr>
                     </tbody>
                  </Table>
               </div>
            )
         }
      })
   }

   render() {
      return (
         <div>
            {this.renderOrder(this.props.status)}
         </div>
      )
   }
}

const mapStateToProps = state => {
   return {
      admin: state.admin_auth
   }
}

export default connect(mapStateToProps)(ManageOrder)