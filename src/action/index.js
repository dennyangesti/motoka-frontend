import axios from '../config/axios'
import cookies from 'universal-cookie'
import Swal from 'sweetalert2'

const cookie = new cookies()

// ------------------------------------
// --------------USER------------------
// --------------START-----------------
// ------------------------------------

// USER LOGIN START
export const loginUser = (username, password) => {
   return (dispatch) => {
      axios.post(`/login`,
         {
            username, password
         }
      ).then(res => {
         if (typeof (res.data) === 'string') {
            Swal.fire({
               type: `error`,
               title: `Error 404`,
               text: res.data
            })
         } else {
            const { id, first_name, last_name, username, email, gender, address, avatar } = res.data
            dispatch({
               type: `LOGIN_SUCCESS`,
               payload: {
                  id, first_name, last_name, username, email, gender, address, avatar
               }
            })
            cookie.set('motokaUser', { id, first_name, last_name, username, email, gender, address, avatar }, { path: `/` })

            Swal.fire({
               position: `center`,
               type: `success`,
               title: `Login Success!`,
               showConfirmButton: false,
               timer: 1500
            })
         }
      })
   }
}

// USER LOGOUT START
export const logoutUser = () => {
   cookie.remove('motokaUser')
   return { type: `LOGOUT_SUCCESS` }
}
// USER LOGOUT END

//UDPATE PROFILE BUTTON
export const editProfile = (id, firstName, lastName, email, gender, address) => {
   return (dispatch) => {
      axios.patch(`/editprofile/${id}`,
         {
            first_name: firstName,
            last_name: lastName,
            email: email,
            gender: gender,
            address: address
         }
      ).then(res => {
         const { id, first_name, last_name, username, email, gender, avatar, address } = res.data
         console.log(res)

         dispatch({
            type: 'PROFILE_UPDATE_SUCCESS',
            payload: {
               id: id,
               first_name: first_name,
               last_name: last_name,
               username: username,
               email: email,
               gender: gender,
               avatar: avatar,
               address: address
            }
         })

         cookie.set('motokaUser', { id, first_name, last_name, username, email, gender, avatar, address }, { path: '/' })
      })
   }
}

//UPDATE or POST AVATAR TO USER
export const updateAvatar = (id, avatar, objUser) => {
   return (dispatch) => {
      const formData = new FormData()
      formData.append('avatar', avatar)

      axios.patch(`/updateavatar/${id}`, formData).then(res => {
         if (typeof (res.data) === 'number') {
            Swal.fire({
               type: 'error',
               title: 'error 404',
               text: res.data
            })
         } else {
            const { id, first_name, last_name, username, email, gender, address } = objUser

            console.log(res.data)

            dispatch({
               type: 'PROFILE_PICTURE_UPLOADED',
               payload: {
                  avatar: res.data
               }
            })

            cookie.set('motokaUser', { id, first_name, last_name, username, email, gender, avatar: res.data, address }, { path: '/' })

            Swal.fire({
               position: 'center',
               type: 'success',
               title: 'Profile Picture Uploaded!',
               showConfirmButton: false,
               timer: 1500
            })
         }
      })
   }
}

// USER KEEP LOGIN START
export const keepLogin = (objUser) => {
   return {
      type: "LOGIN_SUCCESS",
      payload: {
         id: objUser.id,
         username: objUser.username,
         first_name: objUser.first_name,
         last_name: objUser.last_name,
         email: objUser.email,
         gender: objUser.gender,
         address: objUser.address,
         avatar: objUser.avatar
      }
   }
}
// USER KEEP LOGIN END

// ------------------------------------
// ---------------USER-----------------
// ---------------END------------------
// ------------------------------------

// ------------------------------------
// --------------ADMIN-----------------
// --------------START-----------------
// ------------------------------------
export const loginAdmin = (username, password) => {
   return (dispatch) => {
      axios.post(`/login/admin`,
         {
            username, password
         }
      ).then(res => {
         if (typeof (res.data) === 'string') {
            Swal.fire({
               type: `error`,
               title: `Error 404`,
               text: res.data
            })
         } else {
            const { id, username, email } = res.data

            dispatch({
               type: `ADMIN_LOGIN_SUCCESS`,
               payload: {
                  id, username, email
               }
            })
            cookie.set('motokaAdmin', { id, username, password, email }, { path: `/admin ` })

            Swal.fire({
               position: `center`,
               type: `success`,
               title: `Login Success!`,
               showConfirmButton: false,
               timer: 1500
            })
         }
      })
   }
}
// ADMIN LOGIN END

// ADMIN KEEP LOGIN START
export const keepLoginAdmin = (objAdmin) => {
   return {
      type: "ADMIN_LOGIN_SUCCESS",
      payload: {
         id: objAdmin.id,
         username: objAdmin.username,
      }
   }
}
// ADMIN KEEP LOGIN END

// ADMIN LOGOUT START
export const logoutAdmin = () => {
   cookie.remove('motokaAdmin')
   return { type: 'ADMIN_LOGOUT_SUCCESS' }
}
// ADMIN LOGOUT END

// ------------------------------------
// --------------ADMIN-----------------
// ---------------END------------------
// ------------------------------------

// ADD TO CART START
export const addCart = (user_id, first_name, last_name, product_id, quantity, total_price) => {
   axios.patch(`/cart`,
      {
         user_id, first_name, last_name, product_id, quantity, total_price
      }
   ).then(res => {
      if (typeof (res.data) == `string`) {
         Swal.fire({
            type: `error`,
            title: `Error 404`,
            text: res.data
         })
      } else {
         Swal.fire({
            position: `center`,
            type: `success`,
            title: `Product has been added to cart`,
            showConfirmButton: false,
            timer: 1500
         })
      }
   })
}
// ADD TO CART END