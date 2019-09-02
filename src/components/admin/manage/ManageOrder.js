import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Button, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
import HeaderAdmin from '../HeaderAdmin';

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
               <div className='container mt-4' style={{ borderStyle: "solid", borderColor: 'AntiqueWhite' }}>
                  <div className='row mt-2'>
                     <div className='col-4 border-right'>
                        <h3>User ID : {val.user_id}</h3>
                     </div>
                     <div className='col-6'>
                        <div>Username :</div>
                     </div>
                  </div>
                  <hr></hr>
                  <div className='row mt-2'>
                     <div className='col-3 border-right'>
                        <p className='align-self-center'>{val.created_at}</p>
                     </div>
                     <div className='col-3 border-left'>
                        <div>Total Price : IDR. {val.total_price.toLocaleString('IN')}</div>
                     </div>
                  </div>
                  <hr></hr>
                  <div className='row mb-3'>
                     <div className='col-5 borders'>
                        <img className='ml-2' style={{ width: 200, height: 200 }} alt='' src={`http://localhost:2019/checkout/invoice/${val.invoice}`} />
                     </div>
                     <div className='col-2 border-left'>
                        <Button className='btn btn-success m-2' onClick={() => this.onConfirm(val.id)}>Confirm</Button>
                        <Button className='btn btn-danger m-2' onClick={() => this.onDecline(val.id)}>Cancel</Button>
                     </div>
                     <Card>
                        <CardHeader>ORDER RECEIPT</CardHeader>
                        <CardBody>
                           <img className='ml-2' style={{ width: 400, height: 400 }} alt='' src={`http://localhost:2019/checkout/invoice/${val.invoice}`} />
                        </CardBody>
                        <CardFooter>
                           <Button color="success" onClick={() => this.onConfirm(val.id)}>Confirm</Button>
                           <Button color="secondary" onClick={() => { this.onDecline(val.id) }}>Cancel</Button>
                        </CardFooter>
                     </Card>
                  </div>
               </div>
            )
         }
      })
   }

   render() {
      return (
         <div>
            <HeaderAdmin />
            <div style={{ marginTop: 80 }}>
               {this.renderOrder(this.props.status)}
            </div>
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