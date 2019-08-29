import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {
   Card, CardText, CardBody, Button, Form, InputGroupAddon, Label
} from 'reactstrap';
import Swal from 'sweetalert2';

import HeaderAdmin from '../HeaderAdmin'

class ManageProduct extends Component {
   state = {
      productState: [],
      searchProduct: [],
      brandState: [],
      searchBrand: [],
      upload: 0,
      edit: 0,
      input: false,
      filter: false
   }

   componentDidMount() {
      // Akses database
      this.getProduct()
      this.getBrand()
   }

   getProduct = () => {
      axios.get('http://localhost:2019/products')
         .then(res => {
            this.setState({ productState: res.data, searchProduct: res.data, edit: 0, input: 0, upload: 0 })
            console.log(res.data);

         })
   }

   getBrand = () => {
      axios.get('http://localhost:2019/brands')
         .then(res => {
            this.setState({ brandState: res.data, searchBrand: res.data, edit: 0 })
            console.log(res.data);

         })
   }

   addProduct = () => {
      const product_name = this.product_name.value
      const brand_id = this.brand.value
      const description = this.description.value
      const price = parseInt(this.price.value)
      const stock = this.stock.value
      console.log(this.brand.value);

      axios.post(
         'http://localhost:2019/addproducts',
         {
            product_name,
            brand_id,
            description,
            price,
            stock
         }
      ).then(res => {
         Swal.fire(
            'Add Product Success!',
            `New product has been added`,
            'success'
         )
         // GET DATA
         this.getProduct()
         console.log(res.data)
      }).catch((err) => {
         Swal.fire({
            type: 'error',
            title: 'Add Product Failed',
            text: 'Something went wrong!',
         })
         console.log(err)
      })

   }

   onSaveItem = (item) => {
      var product_name = this.editProductName.value
      var brand_id = this.editBrand.value
      var description = this.editDescription.value
      var price = this.editPrice.value
      var stock = this.editStock.value

      axios.patch(
         `http://localhost:2019/products/${item}`,
         {
            product_name,
            brand_id,
            description,
            price,
            stock
         }
      ).then(res => {
         Swal.fire(
            'Update Product Success!',
            `Product has bene updated`,
            'success'
         )
         this.getProduct()
         console.log(res.data)
      }).catch(err => {
         Swal.fire({
            type: 'error',
            title: 'Save Product Failed',
            text: 'Something went wrong!',
         })
         console.log(err)
      })

   }

   onUploadImg = (id) => {
      const formData = new FormData()
      const image = this.image.files[0]

      formData.append('image', image)
      formData.append('id', id)

      axios.post('http://localhost:2019/products/image/', formData
      ).then(res => {
         this.getProduct()
         console.log(res.data)
      })
   }

   onDeleteItem = (item) => {
      axios.delete(`http://localhost:2019/products/${item.id}`)
         .then((res) => {
            Swal.fire(
               'Delete Success!',
               `${item.product_name} has been deleted`,
               'success'
            )
            console.log(res.data)
            this.getProduct()
         })
   }

   onFilterItem = () => {
      const name = this.name.value
      const brandInput = this.brandInput.value
      const max = parseInt(this.max.value)
      const min = parseInt(this.min.value)
      console.log(this.brandInput.value)
      console.log(this.name.value)

      let searchingProduct = this.state.searchProduct.filter(item => {
         if (isNaN(min) && isNaN(max)) { // Search by Name
            return (
               item.product_name.toLowerCase().includes(name.toLowerCase())
            )
         } else if (isNaN(min)) { // Name and Max
            return (
               item.product_name.toLowerCase().includes(name.toLowerCase())
               &&
               item.price <= max
            )
         } else if (isNaN(max)) { // Name and Max
            return (
               item.product_name.toLowerCase().includes(name.toLowerCase())
               &&
               item.price >= min
            )
         } else if (item.price <= max && item.price >= min) {
            return (
               item.product_name.toLowerCase().includes(name.toLowerCase())
               &&
               (item.price <= max && item.price >= min)
            )
         }
      })

      let searchingBrand = this.state.searchBrand.filter(item => {
         if (brandInput) {
            return (
               item.brand_name.toLowerCase().includes(brandInput.toLowerCase())
            )
         }
      })

      if (searchingProduct) {
         this.setState({ productState: searchingProduct, filter: true })
      }
      if (searchingBrand) {
         this.setState({ brandState: searchingBrand, filter: true })
      }

   }

   resetFilter = () => {
      return (
         this.setState({ productState: this.state.searchProduct, brandState: this.state.searchBrand, filter: false })
      )
   }

   onEnter = (enter) => {
      enter.preventDefault()

      this.onFilterItem()
   }

   renderBrand = () => {
      return this.state.brandState.map(brandMap => {
         return (<option value={brandMap.id}>{brandMap.brand_name}</option>)
      })
   }

   renderInputList = () => {
      if (this.state.input === true) {
         return (
            <tr>
               <th scope="col"></th>
               <th scope="col"><input ref={input => this.product_name = input} className="form-control" type="text" /></th>
               <th scope="col">
                  <select className="form-control" ref={input => { this.brand = input }}>
                     {this.renderBrand()}
                  </select>
               </th>
               <th scope="col"><input ref={input => this.description = input} className="form-control" type="text" /></th>
               <th scope="col"><input ref={input => this.price = input} className="form-control" type="text" /></th>
               <th scope="col"><input ref={input => this.stock = input} className="form-control" type="text" /></th>
               <th scope="col"></th>
               <th scope="col">
                  <button className="btn btn-warning" onClick={this.addProduct}>Add</button>
                  <button className="btn btn-danger" onClick={() => this.setState({ input: false })}>Cancel</button>
               </th>
            </tr>
         )
      }
   }

   renderList = () => {
      return this.state.productState.map(item => { // {id, name, price, description, src}
         if (item.id !== this.state.edit) {
            return this.state.brandState.map(brandMap => {
               if (item.brand_id === brandMap.id) {
                  if (item.id !== this.state.upload) {
                     if (item.image) {
                        return (
                           <tr>
                              <td>{item.id}</td>
                              <td>{item.product_name}</td>
                              <td>{brandMap.brand_name}</td>
                              <td>{item.description}</td>
                              <td>{item.price.toLocaleString('IN')}</td>
                              <td>{item.stock}</td>
                              <td>
                                 <img className='list' alt='' onClick={() => { this.setState({ upload: item.id }) }} style={{ width: 100 }} src={`http://localhost:2019/products/avatar/${item.image}`} />
                              </td>
                              <td>
                                 <Button color="danger" onClick={() => { this.setState({ edit: item.id }) }}>Edit</Button>
                                 <button className='btn btn-warning m-1' onClick={() => { this.onDeleteItem(item) }}>Delete</button>
                              </td>
                           </tr>
                        )
                     }
                     return (
                        <tr>
                           <td>{item.id}</td>
                           <td>{item.product_name}</td>
                           <td>{brandMap.brand_name}</td>
                           <td>{item.description}</td>
                           <td>{item.price.toLocaleString('IN')}</td>
                           <td>{item.stock}</td>
                           <td>
                              <button onClick={() => { this.setState({ upload: item.id }) }}>Upload</button>
                           </td>
                           <td>
                              <Button color="danger" onClick={() => { this.setState({ edit: item.id }) }}>Edit</Button>
                              <button className='btn btn-warning m-1' onClick={() => { this.onDeleteItem(item) }}>Delete</button>
                           </td>
                        </tr>
                     )
                  }
                  return (
                     <tr>
                        <td>{item.id}</td>
                        <td>{item.product_name}</td>
                        <td>{brandMap.brand_name}</td>
                        <td>{item.description}</td>
                        <td>{item.price.toLocaleSting('IN')}</td>
                        <td>{item.stock}</td>
                        <td>
                           <input type='file' ref={input => { this.image = input }} />
                        </td>
                        <td>
                           <button className='btn btn-danger m-1' onClick={() => { this.onUploadImg(item.id) }}>Save</button>
                           <button className='btn btn-warning m-1' onClick={() => { this.setState({ upload: 0 }) }}>Cancel</button>
                        </td>
                     </tr>
                  )
               }
            })
         } else {
            return (
               <tr>
                  <td>{item.id}</td>
                  <td>
                     <input className="form-control" ref={input => { this.editProductName = input }} type="text" defaultValue={item.product_name} />
                  </td>
                  <td>
                     {/* <input className="form-control" ref={input => {this.editBrand = input}} type="text" /> */}
                     <select className="form-control" ref={input => { this.editBrand = input }} defaultValue={item.brand_id}>
                        {this.renderBrand()}
                     </select>
                  </td>
                  <td>
                     <input className="form-control" ref={input => { this.editDescription = input }} type="text" defaultValue={item.description} />
                  </td>
                  <td>
                     <input className="form-control" ref={input => { this.editPrice = input }} type="text" defaultValue={item.price.toLocaleString('IN')} />
                  </td>
                  <td>
                     <input className="form-control" ref={input => { this.editStock = input }} type="text" defaultValue={item.stock} />
                  </td>
                  <td>
                     {/* <input type='file' ref={input => {this.image = input}}/> */}
                  </td>
                  <td>
                     <button className='btn btn-danger m-1' onClick={() => { this.onSaveItem(item.id) }}>Save</button>
                     <button className='btn btn-warning m-1' onClick={() => { this.setState({ edit: 0 }) }}>Cancel</button>
                  </td>
               </tr>
            )
         }
      })

   }

   render() {
      const search = require('../../../image/search.png')

      if (this.props.admin.username === '') {
         return <Redirect to='/admin' />
         // return <h1>Loading</h1>
      } else {
         if (this.state.filter) {
            return (
               <div>
                  <HeaderAdmin />
                  <div className="container" style={{ marginTop: 75 }}>
                     <Card style={{ marginBottom: 400 }}>
                        <CardBody>
                           <CardText>
                              <div>
                                 <table className="table table-hover mb-5 text-center">
                                    <thead className='thead-dark'>
                                       <tr>
                                          <th scope="col">ID</th>
                                          <th scope="col">PRODUCT NAME</th>
                                          <th scope="col">BRAND</th>
                                          <th scope="col">DESC</th>
                                          <th scope="col">PRICE</th>
                                          <th scope="col">STOCK</th>
                                          <th scope="col">PICTURE</th>
                                          <th scope="col">ACTION</th>
                                       </tr>
                                    </thead>
                                    <tbody className='thead-light'>
                                       {this.renderInputList()}
                                       {this.renderList()}
                                    </tbody>
                                 </table>
                              </div>
                           </CardText>
                        </CardBody>
                     </Card>
                     <Card body inverse style={{ backgroundColor: 'rgba(0,0,0,0.9)', borderColor: 'rgba(0,0,0,0.9)' }} className='fixed-bottom m-0 p-0'>
                        <CardBody>
                           <CardText>
                              <div className='container'>
                                 <div className='d-flex justify-content-between'>
                                    <div>
                                       <Form inline onSubmit={enter => this.onEnter(enter)}>
                                          {/* <FormGroup className="m-0 p-0"> */}
                                          <Label for='product' className='mr-2'>Product Name: </Label>
                                          <input id='product' className='form-control' placeholder="Search Product by Name" ref={input => { this.name = input }} />
                                          <InputGroupAddon addonType="append"><Button onClick={() => this.onFilterItem()} color="danger"><img src={search} alt=''></img></Button></InputGroupAddon>
                                          {/* </FormGroup> */}
                                       </Form>
                                    </div>
                                    <div>
                                       <button className="btn btn-warning" onClick={() => this.setState({ input: !this.state.input })}>Add Product</button>
                                    </div>
                                    <div>
                                       <Button color='danger' onClick={this.resetFilter}>Reset Filter</Button>
                                    </div>
                                    <div>
                                       <Form inline onSubmit={enter => this.onEnter(enter)}>
                                          {/* <FormGroup className="m-0 p-0"> */}
                                          <Label for='brandid' className='mr-2'>Brand Name: </Label>
                                          <input id='brandid' className='form-control' placeholder="Search Brand by Name" ref={input => { this.brandInput = input }} />
                                          <InputGroupAddon addonType="append"><Button onClick={() => this.onFilterItem()} color="danger"><img src={search} alt=''></img></Button></InputGroupAddon>
                                          {/* </FormGroup> */}
                                       </Form>
                                    </div>
                                 </div>
                                 <div className='row mt-3 m-0 p-0'>
                                    <div className='col-12'>
                                       {/* <Form inline> */}
                                       <div>Price: </div>
                                       <input id='min' placeholder="Search Product by Min Price" className='form-control' ref={input => { this.min = input }} />
                                       <input placeholder="Search Brand by Max Price" className='form-control mt-1' ref={input => { this.max = input }} />
                                       <Button color="danger" size="md" className='mt-3' block onClick={() => this.onFilterItem()}>Search</Button>
                                       {/* </Form> */}
                                    </div>
                                 </div>
                              </div>
                           </CardText>
                        </CardBody>
                     </Card>
                  </div>
               </div>
            )
         }
         return (
            <div>
               <HeaderAdmin />
               <div className="container" style={{ marginTop: 75 }}>
                  <Card style={{ marginBottom: 270 }}>
                     <CardBody>
                        <CardText>
                           <div>
                              <table className="table table-hover mb-5 text-center">
                                 <thead className='thead-dark'>
                                    <tr>
                                       <th scope="col">ID</th>
                                       <th scope="col">PRODUCT NAME</th>
                                       <th scope="col">BRAND</th>
                                       <th scope="col">DESC</th>
                                       <th scope="col">PRICE</th>
                                       <th scope="col">STOCK</th>
                                       <th scope="col">PICTURE</th>
                                       <th scope="col">ACTION</th>
                                    </tr>
                                 </thead>
                                 <tbody className='thead-light'>
                                    {this.renderInputList()}
                                    {this.renderList()}
                                 </tbody>
                              </table>
                           </div>
                        </CardText>
                     </CardBody>
                  </Card>
                  <Card body inverse style={{ backgroundColor: 'rgba(0,0,0,0.9)', borderColor: 'rgba(0,0,0,0.9)' }} className='fixed-bottom m-0 p-0'>
                     <CardBody>
                        <CardText>
                           <div className='container'>
                              <div className='d-flex justify-content-between'>
                                 <div>
                                    <Form inline onSubmit={enter => this.onEnter(enter)}>
                                       {/* <FormGroup className="m-0 p-0"> */}
                                       <Label for='product' className='mr-2'>Product Name: </Label>
                                       <input id='product' className='form-control' placeholder="Search Product by Name" ref={input => { this.name = input }} />
                                       <InputGroupAddon addonType="append"><Button onClick={() => this.onFilterItem()} color="danger"><img src={search} alt=''></img></Button></InputGroupAddon>
                                       {/* </FormGroup> */}
                                    </Form>
                                 </div>
                                 <div>
                                    <button className="btn btn-warning" onClick={() => this.setState({ input: !this.state.input })}>Add Product</button>
                                 </div>
                                 <div>
                                    <Form inline onSubmit={enter => this.onEnter(enter)}>
                                       {/* <FormGroup className="m-0 p-0"> */}
                                       <Label for='brandid' className='mr-2'>Brand Name: </Label>
                                       <input id='brandid' className='form-control' placeholder="Search Brand by Name" ref={input => { this.brandInput = input }} />
                                       <InputGroupAddon addonType="append"><Button onClick={() => this.onFilterItem()} color="danger"><img src={search} alt=''></img></Button></InputGroupAddon>
                                       {/* </FormGroup> */}
                                    </Form>
                                 </div>
                              </div>
                              <div className='row mt-3 m-0 p-0'>
                                 <div className='col-12'>
                                    {/* <Form inline> */}
                                    <div>Price: </div>
                                    <input id='min' placeholder="Search Product by Min Price" className='form-control' ref={input => { this.min = input }} />
                                    <input placeholder="Search Brand by Max Price" className='form-control mt-1' ref={input => { this.max = input }} />
                                    <Button color="danger" size="md" className='mt-3' block onClick={() => this.onFilterItem()}>Search</Button>
                                    {/* </Form> */}
                                 </div>
                              </div>
                           </div>
                        </CardText>
                     </CardBody>
                  </Card>
               </div>
            </div>
         )
      }
   }
}


const mapStatetoProps = state => {
   return {
      admin: state.admin_auth
   }
}


export default connect(mapStatetoProps)(ManageProduct)