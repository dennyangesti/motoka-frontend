import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
   Card, Button, CardImg, CardTitle, CardText, CardGroup,
   CardSubtitle, CardBody, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Jumbotron, Container
} from 'reactstrap';
import classnames from 'classnames';

import Header from '../header/Header'
import Footer from '../../Footer'


class Product extends Component {

   componentDidMount() {
      window.scrollTo(0, 0);
   }

   constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
         activeTab: '1'
      };
   }

   toggle(tab) {
      if (this.state.activeTab !== tab) {
         this.setState({
            activeTab: tab
         });
      }
   }


   renderList = () => {

      return (
         <div style={{ marginTop: '89px' }}>
            <CardGroup>
               <Card>
                  <CardImg top width="100%" src="http://www.hdcarwallpapers.com/thumbs/2018/mclaren_720s_pacific_theme_2018_4k_8k-t2.jpg" alt="Card image cap" />
                  <CardBody>
                     <CardTitle>McLaren</CardTitle>
                     <CardSubtitle>Super Charger</CardSubtitle>
                     <CardText>IDR. 3000000000</CardText>
                     <Button onClick={() => { this.addToCart(this.props.product) }}>Add to cart</Button>
                  </CardBody>
               </Card>
               <Card>
                  <CardImg top width="100%" src="http://www.hdcarwallpapers.com/thumbs/2018/mclaren_720s_pacific_theme_2018_4k_8k-t2.jpg" alt="Card image cap" />
                  <CardBody>
                     <CardTitle>Ferrari</CardTitle>
                     <CardSubtitle>Spider</CardSubtitle>
                     <CardText>IDR. 4000000000</CardText>
                     <Button onClick={() => { this.addToCart(this.props.product) }}>Add to cart</Button>
                  </CardBody>
               </Card>
               <Card>
                  <CardImg top width="100%" src="http://www.hdcarwallpapers.com/thumbs/2018/mclaren_720s_pacific_theme_2018_4k_8k-t2.jpg" alt="Card image cap" />
                  <CardBody>
                     <CardTitle>Lamborghini</CardTitle>
                     <CardSubtitle>Aventador</CardSubtitle>
                     <CardText>IDR. 3500000000</CardText>
                     <Button onClick={() => { this.addToCart(this.props.product) }}>Add to cart</Button>
                  </CardBody>
               </Card>
            </CardGroup>
         </div>
      );
   }

   render() {
      return (
         <div>
            <Header />
            <div className='container' style={{ marginTop: '80px' }}>
               <Nav tabs >
                  <NavItem>
                     <NavLink
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggle('1'); }}
                     >
                        <img src={require('../../../image/logo/logo/fix/bmw.png')} style={{ width: 35 }} alt='' />
                     </NavLink>
                  </NavItem>
                  <NavItem>
                     <NavLink
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggle('2'); }}
                     >
                        <img src={require('../../../image/logo/logo/fix/lamborghini.png')} style={{ width: 35 }} alt='' />
                     </NavLink>
                  </NavItem>
                  <NavItem>
                     <NavLink
                        className={classnames({ active: this.state.activeTab === '3' })}
                        onClick={() => { this.toggle('3'); }}
                     >
                        <img src={require('../../../image/logo/logo/fix/ferrari.png')} style={{ width: 35 }} alt='' />
                     </NavLink>
                  </NavItem>
                  <NavItem>
                     <NavLink
                        className={classnames({ active: this.state.activeTab === '4' })}
                        onClick={() => { this.toggle('4'); }}
                     >
                        <img src={require('../../../image/logo/logo/fix/porsche.png')} style={{ width: 35 }} alt='' />
                     </NavLink>
                  </NavItem>
                  <NavItem>
                     <NavLink
                        className={classnames({ active: this.state.activeTab === '5' })}
                        onClick={() => { this.toggle('5'); }}
                     >
                        <img src={require('../../../image/logo/logo/fix/buggati.png')} style={{ width: 35 }} alt='' />
                     </NavLink>
                  </NavItem>
                  <NavItem>
                     <NavLink
                        className={classnames({ active: this.state.activeTab === '6' })}
                        onClick={() => { this.toggle('6'); }}
                     >
                        <img src={require('../../../image/logo/logo/fix/rollsroyce.png')} style={{ width: 35 }} alt='' />
                     </NavLink>
                  </NavItem>
                  <NavItem>
                     <NavLink
                        className={classnames({ active: this.state.activeTab === '7' })}
                        onClick={() => { this.toggle('7'); }}
                     >
                        <img src={require('../../../image/logo/logo/fix/alfaromeo.png')} style={{ width: 35 }} alt='' />
                     </NavLink>
                  </NavItem>
                  <NavItem>
                     <NavLink
                        className={classnames({ active: this.state.activeTab === '8' })}
                        onClick={() => { this.toggle('8'); }}
                     >
                        <img src={require('../../../image/logo/logo/fix/chevrolet.png')} style={{ width: 35 }} alt='' />
                     </NavLink>
                  </NavItem>
                  <NavItem>
                     <NavLink
                        className={classnames({ active: this.state.activeTab === '9' })}
                        onClick={() => { this.toggle('9'); }}
                     >
                        <img src={require('../../../image/logo/logo/fix/honda.png')} style={{ width: 35 }} alt='' />
                     </NavLink>
                  </NavItem>
                  <NavItem>
                     <NavLink
                        className={classnames({ active: this.state.activeTab === '10' })}
                        onClick={() => { this.toggle('10'); }}
                     >
                        <img src={require('../../../image/logo/logo/fix/landrover.png')} style={{ width: 35 }} alt='' />
                     </NavLink>
                  </NavItem>
                  <NavItem>
                     <NavLink
                        className={classnames({ active: this.state.activeTab === '11' })}
                        onClick={() => { this.toggle('11'); }}
                     >
                        <img src={require('../../../image/logo/logo/fix/lotus.png')} style={{ width: 35 }} alt='' />
                     </NavLink>
                  </NavItem>
                  <NavItem>
                     <NavLink
                        className={classnames({ active: this.state.activeTab === '12' })}
                        onClick={() => { this.toggle('12'); }}
                     >
                        <img src={require('../../../image/logo/logo/fix/maserati.png')} style={{ width: 35 }} alt='' />
                     </NavLink>
                  </NavItem>
                  <NavItem>
                     <NavLink
                        className={classnames({ active: this.state.activeTab === '13' })}
                        onClick={() => { this.toggle('13'); }}
                     >
                        <img src={require('../../../image/logo/logo/fix/mclaren.png')} style={{ width: 35 }} alt='' />
                     </NavLink>
                  </NavItem>
                  <NavItem>
                     <NavLink
                        className={classnames({ active: this.state.activeTab === '14' })}
                        onClick={() => { this.toggle('14'); }}
                     >
                        <img src={require('../../../image/logo/logo/fix/mercedes.png')} style={{ width: 35 }} alt='' />
                     </NavLink>
                  </NavItem>
                  <NavItem>
                     <NavLink
                        className={classnames({ active: this.state.activeTab === '15' })}
                        onClick={() => { this.toggle('15'); }}
                     >
                        <img src={require('../../../image/logo/logo/fix/nissan.png')} style={{ width: 35 }} alt='' />
                     </NavLink>
                  </NavItem>
                  <NavItem>
                     <NavLink
                        className={classnames({ active: this.state.activeTab === '16' })}
                        onClick={() => { this.toggle('16'); }}
                     >
                        <img src={require('../../../image/logo/logo/fix/toyota.png')} style={{ width: 35 }} alt='' />
                     </NavLink>
                  </NavItem>
               </Nav>
               <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                     <Row>
                        <Col sm="12">
                           <div>
                              <Jumbotron className='p-3 mb-2'>
                                 <Container>
                                    <Row>
                                       <Col sm='8'>
                                          <Link>
                                             <Card>
                                                <CardImg top width='100%' src={require('../../../image/product/bmw/mulgari-1.jpg')} alt='' />
                                             </Card>
                                          </Link>
                                       </Col>
                                       <Col sm='4'>
                                          <h1 className="display-5">BMW Mulgari</h1>
                                          <p className="lead">Available for order</p>
                                          <hr className="my-2" />
                                          <p>Description LOREM</p>
                                       </Col>
                                    </Row>
                                 </Container>
                              </Jumbotron>
                           </div>
                        </Col>
                     </Row>
                     <Row>
                        <Col sm="12">
                           <div>
                              <Jumbotron className='p-3 mb-2'>
                                 <Container>
                                    <Row>
                                       <Col sm='8'>
                                          <Link>
                                             <Card>
                                                <CardImg top width='100%' src={require('../../../image/product/bmw/mulgari-1.jpg')} alt='' />
                                             </Card>
                                          </Link>
                                       </Col>
                                       <Col sm='4'>
                                          <h1 className="display-5">BMW Mulgari</h1>
                                          <p className="lead">Available for order</p>
                                          <hr className="my-2" />
                                          <p>Description LOREM</p>
                                       </Col>
                                    </Row>
                                 </Container>
                              </Jumbotron>
                           </div>
                        </Col>
                     </Row>
                  </TabPane>

                  <TabPane tabId="2">
                     <Row>
                        <Col sm="12">
                           <Row>
                              <Col sm="12">
                                 <div>
                                    <Jumbotron className='p-3 mb-2'>
                                       <Container>
                                          <Row>
                                             <Col sm='8'>
                                                <Card onClick={{}}>
                                                   <CardImg top width='100%' src={require('../../../image/product/lamborghini/huracan-evo-1.jpg')} alt='' />
                                                </Card>
                                             </Col>
                                             <Col sm='4'>
                                                <h1 className="display-5">Lamborghini Huracan Evo</h1>
                                                <p className="lead">Available for order</p>
                                                <hr className="my-2" />
                                                <p>Description LOREM</p>
                                             </Col>
                                          </Row>
                                       </Container>
                                    </Jumbotron>
                                 </div>
                                 <div>
                                    <Jumbotron className='p-3 mb-2'>
                                       <Container>
                                          <Row>
                                             <Col sm='8'>
                                                <Link>
                                                   <Card>
                                                      <CardImg top width='100%' src={require('../../../image/product/lamborghini/sc18-3.jpg')} alt='' />
                                                   </Card>
                                                </Link>
                                             </Col>
                                             <Col sm='4'>
                                                <h1 className="display-5">Lamborghini SC-18</h1>
                                                <p className="lead">Available for order</p>
                                                <hr className="my-2" />
                                                <p>Description LOREM</p>
                                             </Col>
                                          </Row>
                                       </Container>
                                    </Jumbotron>
                                 </div>
                                 <div>
                                    <Jumbotron className='p-3 mb-2'>
                                       <Container>
                                          <Row>
                                             <Col sm='8'>
                                                <Link>
                                                   <Card>
                                                      <CardImg top width='100%' src={require('../../../image/product/lamborghini/aventador-svj-2.jpg')} alt='' />
                                                   </Card>
                                                </Link>
                                             </Col>
                                             <Col sm='4'>
                                                <h1 className="display-5">Lamborghini Aventador</h1>
                                                <p className="lead">Available for order</p>
                                                <hr className="my-2" />
                                                <p>Description LOREM</p>
                                             </Col>
                                          </Row>
                                       </Container>
                                    </Jumbotron>
                                 </div>
                              </Col>
                           </Row>
                        </Col>
                     </Row>
                  </TabPane>
                  <TabPane tabId="3">
                     <Row>
                        <Col sm="12">
                           <div>
                              <Jumbotron className='p-3 mb-2'>
                                 <Container>
                                    <Row>
                                       <Col sm='8'>
                                          <Link>
                                             <Card>
                                                <CardImg top width='100%' src={require('../../../image/product/ferrari/f8-tributo-4.jpg')} alt='' />
                                             </Card>
                                          </Link>
                                       </Col>
                                       <Col sm='4'>
                                          <h1 className="display-5">Ferrari F8 Tributo</h1>
                                          <p className="lead">Available for order</p>
                                          <hr className="my-2" />
                                          <p>Description LOREM</p>
                                       </Col>
                                    </Row>
                                 </Container>
                              </Jumbotron>
                           </div>
                           <div>
                              <Jumbotron className='p-3 mb-2'>
                                 <Container>
                                    <Row>
                                       <Col sm='8'>
                                          <Link>
                                             <Card>
                                                <CardImg top width='100%' src={require('../../../image/product/ferrari/monza-sp2-5.jpg')} alt='' />
                                             </Card>
                                          </Link>
                                       </Col>
                                       <Col sm='4'>
                                          <h1 className="display-5">Ferrari Monza SPII</h1>
                                          <p className="lead">Available for order</p>
                                          <hr className="my-2" />
                                          <p>Description LOREM</p>
                                       </Col>
                                    </Row>
                                 </Container>
                              </Jumbotron>
                           </div>
                        </Col>
                     </Row>
                  </TabPane>
                  <TabPane tabId="4">
                     <Row>
                        <Col sm="12">
                           <h4>Porsche</h4>
                        </Col>
                     </Row>
                  </TabPane>
                  <TabPane tabId="5">
                     <Row>
                        <Col sm="12">
                           <h4>Bugati</h4>
                        </Col>
                     </Row>
                  </TabPane>
                  <TabPane tabId="6">
                     <Row>
                        <Col sm="12">
                           <h4>Rolls Royce</h4>
                        </Col>
                     </Row>
                  </TabPane>
                  <TabPane tabId="7">
                     <Row>
                        <Col sm="12">
                           <h4>Alfa Romeo</h4>
                        </Col>
                     </Row>
                  </TabPane>
                  <TabPane tabId="8">
                     <Row>
                        <Col sm="12">
                           <h4>Chevrolet</h4>
                        </Col>
                     </Row>
                  </TabPane>
                  <TabPane tabId="9">
                     <Row>
                        <Col sm="12">
                           <h4>Honda</h4>
                        </Col>
                     </Row>
                  </TabPane>
                  <TabPane tabId="10">
                     <Row>
                        <Col sm="12">
                           <h4>Land Rover</h4>
                        </Col>
                     </Row>
                  </TabPane>
                  <TabPane tabId="11">
                     <Row>
                        <Col sm="12">
                           <h4>Lotus</h4>
                        </Col>
                     </Row>
                  </TabPane>
                  <TabPane tabId="12">
                     <Row>
                        <Col sm="12">
                           <h4>Maserati</h4>
                        </Col>
                     </Row>
                  </TabPane>
                  <TabPane tabId="13">
                     <Row>
                        <Col sm="12">
                           <h4>Mclaren</h4>
                        </Col>
                     </Row>
                  </TabPane>
                  <TabPane tabId="14">
                     <Row>
                        <Col sm="12">
                           <h4>Mercedez Benz</h4>
                        </Col>
                     </Row>
                  </TabPane>
                  <TabPane tabId="15">
                     <Row>
                        <Col sm="12">
                           <h4>Nissan</h4>
                        </Col>
                     </Row>
                  </TabPane>
                  <TabPane tabId="16">
                     <Row>
                        <Col sm="12">
                           <h4>Toyota</h4>
                        </Col>
                     </Row>
                  </TabPane>
               </TabContent>
            </div>
            <Footer />
         </div>
      )
   }
}

export default Product
