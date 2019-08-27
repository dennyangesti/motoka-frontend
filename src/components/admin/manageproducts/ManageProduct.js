import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from 'reactstrap';
import Swal from 'sweetalert2';

import HeaderAdmin from '../HeaderAdmin'

class ManageProduct extends Component {
   state = {
      products: [],
      brands: [],
      edit: 0,
      input: false,
      upload: 0
   }

   componentDidMount() {
      // Akses database
      this.getProduct()
      this.getBrands()
   }

   getProduct = () => {
      axios.get('http://localhost:2019/products')
         .then(res => {
            this.setState({ products: res.data, edit: 0, input: 0, upload: 0 })
            console.log(res.data);

         })
   }

   getBrands = () => {
      axios.get('http://localhost:2019/brands')
         .then(res => {
            this.setState({ brands: res.data, edit: 0 })
            console.log(res.data);

         })
   }

   addProduct = () => {
      const product_name = this.product_name.value
      const brand_name = this.brands.value
      const description = this.description.value
      const price = parseInt(this.price.value)
      const stock = this.stock.value

      axios.get(`http://localhost:2019/brandname?brand_name=${brand_name}`)
         .then(res => {
            const brand_id = res.data.id

            axios.post(
               'http://localhost:2019/addproducts/',
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
                  'Your product has been added',
                  res.data
               )
               // GET DATA
               this.getProduct()
            })
         })
   }

   onSaveItem = (item) => {
      var product_name = this.editProductName.value
      var brand = this.editBrand.value
      var description = this.editDescription.value
      var price = this.editPrice.value
      var stock = this.editStock.value

      axios.get(`http://localhost:2019/brandname?brand_name=${brand}`)
         .then(res => {
            const brand_id = res.data.id
            console.log(brand_id);


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
                  'Edit Product Success!',
                  'Your product has been updated',
               )
               this.getProduct()
               console.log(res.data)
            }).catch(err => {
               Swal.fire({
                  type: 'error',
                  title: 'Oops...',
               })
               console.log(err)
            })
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
      })
   }

   onDeleteItem = (item) => {
      axios.delete(`http://localhost:2019/products/${item.id}`)
         .then((res) => {
            Swal.fire(
               'Delete Product Success!',
               'Your product has been deleted',
               res.data
            )
            this.getProduct()
         })
   }

   renderBrand = () => {
      return this.state.brands.map(brandMap => {
         return (<option>{brandMap.brand_name}</option>)
      })
   }

   renderInputList = () => {
      if (this.state.input === true) {
         return (
            <tr>
               <th scope="col"></th>
               <th scope="col"><input ref={input => this.product_name = input} className="form-control" type="text" /></th>
               <th scope="col">
                  <select className="form-control" ref={input => { this.brands = input }}>
                     {this.renderBrand()}
                  </select>
               </th>
               <th scope="col"><input ref={input => this.description = input} className="form-control" type="text" /></th>
               <th scope="col"><input ref={input => this.price = input} className="form-control" type="text" /></th>
               <th scope="col"><input ref={input => this.stock = input} className="form-control" type="text" /></th>
               <th scope="col"></th>
               <th scope="col">
                  <button className="btn btn-warning" onClick={this.addProduct}>Add Product</button>
                  <button className="btn btn-danger" onClick={() => this.setState({ input: false })}>Cancel</button>
               </th>
            </tr>
         )
      }
   }

   renderList = () => {
      return this.state.products.map(item => { // {id, name, price, description, src}
         if (item.id !== this.state.edit) {
            return this.state.brands.map(brandMap => {
               if (item.brand_id === brandMap.id) {
                  if (item.id !== this.state.upload) {
                     if (item.image) {
                        return (
                           <tr>
                              <td>{item.id}</td>
                              <td>{item.product_name}</td>
                              <td>{brandMap.brand_name}</td>
                              <td>{item.description}</td>
                              <td>{item.price}</td>
                              <td>{item.stock}</td>
                              <td>
                                 <img className='list' alt='' onClick={() => { this.setState({ upload: item.id }) }} style={{ width: 100 }} src={`http://localhost:2019/products/avatar/${item.image}`} />
                              </td>
                              <td>
                                 <Button color="danger" onClick={() => { this.setState({ edit: item.id }) }}>Edit</Button>
                                 <button className='btn btn-warning m-1' onClick={() => { this.deleteProduct(item) }}>Delete</button>
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
                           <td>{item.price}</td>
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
                        <td>{item.price}</td>
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

            }
            )
         } else {
            return (
               <tr>
                  <td>{item.id}</td>
                  <td>
                     <input className="form-control" ref={input => { this.editProductName = input }} type="text" defaultValue={item.product_name} />
                  </td>
                  <td>
                     {/* <input className="form-control" ref={input => {this.editBrand = input}} type="text" /> */}
                     <select className="form-control" ref={input => { this.editBrand = input }}>
                        {this.renderBrand()}
                     </select>
                  </td>
                  <td>
                     <input className="form-control" ref={input => { this.editDescription = input }} type="text" defaultValue={item.description} />
                  </td>
                  <td>
                     <input className="form-control" ref={input => { this.editPrice = input }} type="text" defaultValue={item.price} />
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
      if (this.props.admin.username === '') {
         return <Redirect to='/admin' />
         // return <h1>Loading</h1>
      }
      return (
         <div>
            <HeaderAdmin />
            <div className="container" style={{ marginTop: 60 }}>
               <h1 className="display-4 text-center">Car List</h1>
               <div className='d-flex justify-content-end'>
                  <button className="btn btn-primary w-100" onClick={() => this.setState({ input: !this.state.input })}>Add</button>
               </div>
               <table className="table table-hover mb-5">
                  <thead>
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
                  <tbody>
                     {this.renderList()}
                     {this.renderInputList()}
                  </tbody>
               </table>
            </div>
         </div>
      )
   }

}


const mapStatetoProps = state => {
   return {
      admin: state.admin_auth
   }
}


export default connect(mapStatetoProps)(ManageProduct)