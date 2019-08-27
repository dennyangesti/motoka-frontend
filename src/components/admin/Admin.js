import React, { Component } from 'react'

import HeaderAdmin from './HeaderAdmin';

class Admin extends Component {
   refresh = (reload) => {
      document.location.reload(reload)
   }

   render() {
      return (
         <div>
            <HeaderAdmin />
         </div>
      )
   }
}

export default Admin