import React, { Component } from 'react'
import { Card, Button, CardTitle, CardImg, CardText, Row, Col, Table } from 'reactstrap';
import { Link } from 'react-router-dom'

import Header from '../header/Header'
import Footer from '../../Footer'

class Cart extends Component {
   renderlist = () => {
      return (
         <Table borderless>
            <thead>
               <tr>
                  <th></th>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
               </tr>
               <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
               </tr>
               <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
               </tr>
            </tbody>
         </Table>
      )
   }

   render() {
      return (
         <div style={{ backgroundImage: "url(http://www.hdcarwallpapers.com/walls/ferrari_gtc4lusso_t-HD.jpg)", backgroundSize: 'cover', backgroundPosition: '65%' }}>
            <Header />
            <div className='container mb-5' style={{ marginTop: 88 }}>
               <Row style={{ opacity: '0.9' }}>
                  <Col sm="8">
                     <Card className='mb-3'>
                        <CardTitle className='display-4 m-1 p-1 text-uppercase text-center'>Cart</CardTitle>
                     </Card>
                     <Card>
                        <Row className='m-1 p-1 border-bottom'>
                           <Col sm='4'>
                              <CardImg className='img-thumbnail' top width='100%' src={require('../../../image/product/ferrari/monza-sp2-5.jpg')} alt='' />
                           </Col>
                           <Col>
                              {this.renderlist}
                           </Col>
                        </Row>
                        <Row className='m-1 p-1 border-bottom'>
                           <Col sm='4'>
                              <CardImg className='img-thumbnail' top width='100%' src={require('../../../image/product/ferrari/monza-sp2-5.jpg')} alt='' />
                           </Col>
                           <Col>
                              <CardText>Product Name</CardText>
                              <CardText>IDR. Product Price</CardText>
                              <CardText>Product Quantity</CardText>
                           </Col>
                        </Row>
                        <Row className='m-1 p-1 border-bottom'>
                           <Col sm='4'>
                              <CardImg className='img-thumbnail' top width='100%' src={require('../../../image/product/ferrari/monza-sp2-5.jpg')} alt='' />
                           </Col>
                           <Col>
                              <CardText>Product Name</CardText>
                              <CardText>IDR. Product Price</CardText>
                              <CardText>Product Quantity</CardText>
                           </Col>
                        </Row>
                        <Row className='m-1 p-1 border-bottom'>
                           <Col sm='4'>
                              <CardImg className='img-thumbnail' top width='100%' src={require('../../../image/product/ferrari/monza-sp2-5.jpg')} alt='' />
                           </Col>
                           <Col>
                              <CardText>Product Name</CardText>
                              <CardText>IDR. Product Price</CardText>
                              <CardText>Product Quantity</CardText>
                           </Col>
                        </Row>
                     </Card>
                  </Col>
                  <Col sm="4">
                     <Card body>
                        <CardTitle className='h2 border-bottom m-1 p-1 text-uppercase'>Total</CardTitle>
                        <div className='justify-content-between row m-1 p-1'>
                           <CardText>Sub-total</CardText>
                           <CardText>IDR Total</CardText>
                        </div>
                        <Link to='/'>
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

export default Cart