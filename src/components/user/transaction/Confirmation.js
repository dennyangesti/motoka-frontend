import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Card, CardText, CardTitle, CardBody } from 'reactstrap'
import Swal from 'sweetalert2'

import Header from '../header/Header'
import Footer from '../../Footer'

class Confirmation extends Component {
   state = {
      checkout: [],
      redirect: false
   }

   setRedirect = () => {
      this.setState({
         redirect: true
      })
   }

   componentDidMount() {
      this.getCheckout()
   }

   getCheckout = () => {
      let user_id = this.props.match.params.user_id

      axios.get(`http://localhost:2019/checkoutpending/${user_id}`)
         .then(res => {
            this.setState({ checkout: res.data })
            console.log(res.data);
         })
   }

   uploadImage = (id) => {
      const formData = new FormData()
      const invoice = this.image.files[0]

      formData.append('invoice', invoice)
      formData.append('id', id)

      axios.post('http://localhost:2019/checkoutinvoice', formData
      ).then(res => {
         Swal.fire({
            type: 'success',
            title: 'Upload Success!',
            text: 'Your receipt has been uploaded, we will continue the transaction, please wait...',
         })
         console.log(res.data);
         this.setRedirect()
      })
   }

   renderRedirect = () => {
      if (this.state.redirect) {
         return <Redirect to={`/order/${this.props.user.id}`} />
      }
   }

   render() {
      return this.state.checkout.map(val => {
         if (val.user_id === this.props.user.id) {
            return (
               <div>
                  <Header />
                  <div className='container mt-2 mb-5'>
                     <Card style={{ marginTop: 88 }}>
                        <CardBody>
                           <CardTitle>Total Price</CardTitle>
                           <CardText>IDR {val.total_price.toLocaleString('IN')}</CardText>
                        </CardBody>
                     </Card>
                     <Card>
                        <CardBody>
                           <CardTitle>Payment Confirmation</CardTitle>
                           <form>
                              <input type='file' ref={input => { this.image = input }}></input>
                           </form>
                           <Button class="btn btn-danger btn-lg btn-block" onClick={() => { this.uploadImage(val.id) }}>Continue to checkout</Button>
                        </CardBody>
                     </Card>
                     {this.renderRedirect()}
                  </div>
                  <Footer />
               </div >
            )
         }
      })
   }
}

const mapStateToProps = state => {
   return {
      user: state.auth // id dan username
   }
}

export default connect(mapStateToProps)(Confirmation)