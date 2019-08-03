import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

class ProductItem extends Component {

   addToCart() {

      const userID = this.props.user.id
      const jumlah = parseInt(this.jumlah.value)
      // var sesuai nama database
      var { id, name, price, src } = this.props.barang

      // Verifikasi apabila user telah login sebelum membeli dan memasukkan jumlah barang ke cart
      if (jumlah >= 0 && userID !== '') {
         axios.get(
            'http://localhost:2019/Cart',
            {
               params: {
                  userID: userID,
                  productID: id
               }
            }
         ).then(res => {
            if (res.data.length > 0) {
               const totalJumlah = Number(res.data[0].quantity) + Number(jumlah)
               console.log(jumlah)
               console.log(res)
               axios.put('http://localhost:2019/Cart/' + res.data[0].id,
                  { // Validasi user ketika update jumlah product
                     userID: userID,
                     productID: id,
                     productName: name,
                     productPrice: price,
                     quantity: totalJumlah,
                     inputGambar: src

                  }).then(res => {
                     alert('Produk telah ditambahkan!')
                  })

            } else { // Jika belum ada produk akan ditambahkan ke dalam database
               axios.post(
                  'http://localhost:2019/Cart',
                  {
                     userID: userID,
                     productID: id,
                     productName: name,
                     productPrice: price,
                     quantity: jumlah,
                     inputGambar: src
                  }

               ).then(res => {
                  console.log(res)
                  alert('Produk baru berhasil dimasukkan ke cart')

               }).catch(err => {
                  console.log(err)

               })
            }
         })

      } else { // Jika user belum login
         if (userID === '') {
            alert('Silahkan login terlebih dahulu')

         } else { // Jika belum memasukkan jumlah
            alert('Silahkan masukkan jumlah yang anda inginkan')
         }
      }

   }

   render() {

      var { id, name, price, src } = this.props.barang // {id, name, desc, price, src}
      // id = 3

      return (
         <div className="card col-3 m-5">
            <img src={src} className='card-img-top' alt='' />
            <div className='card-body'>
               <h5 className='card-title'>{name}</h5>
               <p className='card-text'>Rp. {price}/hr</p>
               <input type='text' className='form-control' ref={(input) => { this.jumlah = input }} />
               <Link to={"/detailproduct/" + id}>
                  <button className='btn btn-outline-primary btn-block'>Details</button>
               </Link>
               <button className='btn btn-primary btn-block' onClick={() => { this.addToCart(this.props.product) }} >Add To Cart</button>
            </div>
         </div>
      )
   }
}

const mapStateToProps = (state) => {
   return {
      user: state.auth
   }
}

export default connect(mapStateToProps)(ProductItem)