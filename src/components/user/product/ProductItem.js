import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CardGroup, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'

class ProductItem extends Component {
   render() {
      let { product_name, price, description, image } = this.props.items
      return (
         <CardGroup>
            <Card>
               <CardImg top width="100%" src={`http://localhost:2019/products/avatar/${image}`} alt="Card image cap" />
               <CardBody>
                  <Link to={`/detailproduct/`}>
                     <CardTitle>{product_name}</CardTitle>
                     <CardSubtitle>IDR. {price.toLocaleString('IN')}</CardSubtitle>
                     <CardText>{description}</CardText>
                  </Link>
                  <Button>Add to cart</Button>
               </CardBody>
            </Card>
         </CardGroup>
      )
   }
}


export default ProductItem