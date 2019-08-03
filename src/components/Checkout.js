import React, { Component } from 'react'

class Checkout extends Component {

   componentDidMount() {
      window.scrollTo(0, 0);
   }

   fnTotalHarga = () => {
      var subHarga = 0;
      var arrHarga = this.props.listCart

      for (var i = 0; i < arrHarga.length; i++) {
         subHarga += arrHarga[i].quantity * arrHarga[i].productPrice
      }

      return <td>{"IDR " + subHarga.toLocaleString()}</td>
   }

   checkoutList = () => {
      return this.props.listCart.map(item => {
         return (
            <tr>
               <td>{item.productName}</td>
               <td>{item.quantity}</td>
               <td>IDR {item.productPrice.toLocaleString()}</td>
               <td>IDR {(item.productPrice * item.quantity).toLocaleString()}</td>
            </tr>
         )
      })
   }

   render() {
      return (
         <div>
            <h1 className="display-4 text-center">Total Payment</h1>
            <table className="table table-hover mb-5">
               <thead>
                  <tr>
                     <th scope="col">NAME</th>
                     <th scope="col">QTY</th>
                     <th scope="col">PRICE</th>
                     <th scope="col">TOTAL</th>
                  </tr>
               </thead>
               <tbody>
                  {this.checkoutList()}
               </tbody>
               <tfoot>
                  <tr>
                     <th colSpan="3">TOTAL PRICE</th>
                     {this.fnTotalHarga()}
                  </tr>

               </tfoot>
            </table>

         </div>
      )
   }
}

export default Checkout