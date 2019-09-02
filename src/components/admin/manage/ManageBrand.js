import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Card, CardBody, CardText } from 'reactstrap';
import Swal from 'sweetalert2';

import HeaderAdmin from '../HeaderAdmin'

class ManageBrand extends Component {

   state = {
      brands: [],
      edit: 0,
      input: 0,
      upload: 0
   }

   componentDidMount() {
      this.getBrands()
   }

   getBrands = () => {
      axios.get('http://localhost:2019/brands')
         .then(res => {
            this.setState({ brands: res.data, edit: 0, input: 0, upload: 0 })
            console.log(res.data);

         })
   }

   addBrands = () => {
      const brand_name = this.brand_name.value

      axios.post(
         'http://localhost:2019/addbrand',
         {
            brand_name
         }
      ).then((res) => {
         Swal.fire(
            'Add Brand Success!',
            'New brand has been added',
            'success'
         )
         console.log(res.data)
         this.getBrands()
      }).catch((err) => {
         Swal.fire({
            type: 'error',
            title: 'Add Product Failed',
            text: 'Something went wrong!',
         })
         console.log(err)
      })
   }

   deleteBrand = (item) => {
      axios.delete(`http://localhost:2019/brands/${item.id}`)
         .then(res => {
            Swal.fire(
               'Delete Success!',
               `${item.brand_name} are deleted`,
               'success'
            )
            console.log(res);
            this.getBrands()
         })
   }

   saveBrand = (item) => {
      const brand_name = this.editBrandName.value

      axios.patch(`http://localhost:2019/brands/${item.id}`,
         {
            brand_name
         }).then(res => {
            Swal.fire(
               'Update Brand Success!',
               'Brand has been updated',
               'success'
            )
            console.log(res);
            this.getBrands()
         }).catch(err => {
            Swal.fire({
               type: 'error',
               title: 'Save Brand Failed',
               text: 'Something went wrong!',
            })
            console.log(err)
         })
   }

   onUploadImg = (id) => {
      const formData = new FormData()
      const brand_image = this.image.files[0]

      formData.append('brand', brand_image)
      formData.append('id', id)

      axios.post('http://localhost:2019/brand/image/', formData
      ).then(res => {
         this.getBrands()
         console.log(res.data)
      })
   }

   onEnter = (enter) => {
      enter.preventDefault()

   }

   renderInputList = () => {
      if (this.state.input === true) {
         return (
            <tr>
               <th scope="col"></th>
               <th scope="col">
                  <input ref={input => this.brand_name = input} className="form-control" type="text" />
               </th>
               <th scope="col">
                  <button className="btn btn-warning" onClick={this.addBrands}>Add</button>
                  <button className="btn btn-danger" onClick={() => this.setState({ input: false })}>Cancel</button>
               </th>
            </tr>
         )
      }
   }

   renderList = () => {
      return this.state.brands.map(item => { // {id, name, image}
         if (item.id !== this.state.edit) {
            if (item.id !== this.state.upload) {
               if (item.brand_image) {
                  return (
                     <tr>
                        <td>{item.id}</td>
                        <td>{item.brand_name}</td>
                        <td>
                           <img className='list' alt='' onClick={() => { this.setState({ upload: item.id }) }} style={{ width: 50 }} src={`http://localhost:2019/brand/avatar/${item.brand_image}`} />
                        </td>
                        <td>
                           <Button color="danger" onClick={() => { this.setState({ edit: item.id }) }}>Edit</Button>
                           <button className='btn btn-warning m-1' onClick={() => { this.deleteBrand(item) }}>Delete</button>
                        </td>
                     </tr>
                  )
               }
               return (
                  <tr>
                     <td>{item.id}</td>
                     <td>{item.brand_name}</td>
                     <td>
                        <button onClick={() => { this.setState({ upload: item.id }) }}>Upload</button>
                     </td>
                     <td>
                        <Button color="danger" onClick={() => { this.setState({ edit: item.id }) }}>Edit</Button>
                        <button className='btn btn-warning m-1' onClick={() => { this.deleteBrand(item) }}>Delete</button>
                     </td>
                  </tr>
               )
            }
            return (
               <tr>
                  <td>{item.id}</td>
                  <td>{item.brand_name}</td>
                  <td>
                     <input type='file' ref={input => { this.image = input }} />
                  </td>
                  <td>
                     <button className='btn btn-danger m-1' onClick={() => { this.onUploadImg(item.id) }}>Save</button>
                     <button className='btn btn-warning m-1' onClick={() => { this.setState({ upload: 0 }) }}>Cancel</button>
                  </td>
               </tr>
            )
         } else {
            return (
               <tr>
                  <td>{item.id}</td>
                  <td>
                     <input className="form-control" ref={input => { this.editBrandName = input }} type="text" defaultValue={item.brand_name} />
                  </td>
                  <td>
                     <button className='btn btn-danger m-1' onClick={() => { this.saveBrand(item) }}>Save</button>
                     <button className='btn btn-warning m-1' onClick={() => { this.setState({ edit: 0 }) }}>Cancel</button>
                  </td>
               </tr>
            )
         }
      })

   }

   render() {

      if (this.props.admin.username === '') {
         return <Redirect to='/dashboard' />
         // return <h1>Loading</h1>
      } else {
         return (
            <div>
               <HeaderAdmin />
               <div className="container" style={{ marginTop: 75 }}>
                  <Card style={{ marginBottom: 270 }}>
                     <CardBody>
                        <CardText>
                           <table className="table table-hover mb-5 text-center">
                              <thead className='thead-dark'>
                                 <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">BRAND NAME</th>
                                    <th scope="col">PICTURE</th>
                                    <th scope="col">ACTION</th>
                                 </tr>
                              </thead>
                              <tbody className='thead-light'>
                                 {this.renderInputList()}
                                 {this.renderList()}
                              </tbody>
                           </table>
                        </CardText>
                     </CardBody>
                  </Card>
                  <Card body inverse style={{ backgroundColor: 'rgba(0,0,0,0.9)', borderColor: 'rgba(0,0,0,0.9)' }} className='fixed-bottom m-0 p-0'>
                     <CardBody>
                        <CardText>
                           <div className='text-center'>
                              <button className='btn btn-success' onClick={() => this.setState({ input: !this.state.input })}>Add Brands</button>
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

const mapStateToProps = state => {
   return {
      admin: state.admin_auth
   }
}


export default connect(mapStateToProps)(ManageBrand)