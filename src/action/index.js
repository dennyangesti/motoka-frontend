
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
            const { id, first_name, last_name, username, password, email, verified, gender, address, avatar } = res.data
            if (verified === 1) {
               dispatch({
                  type: `LOGIN_SUCCESS`,
                  payload: {
                     id, first_name, last_name, username, password, email, verified, gender, address, avatar
                  }
               })
               cookie.set(`users`, { id, first_name, last_name, username, password, email, verified, gender, address, avatar }, { path: `/` })

               Swal.fire({
                  position: `center`,
                  type: `success`,
                  title: `Login Success!`,
                  showConfirmButton: false,
                  timer: 1500
               })

            } else {
               Swal.fire({
                  type: `error`,
                  title: `Email has not been verified`,
                  text: `Please check your email to verified`
               })
            }
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
         username: objUser.username
      }
   }
}
// USER KEEP LOGIN END

// USER LOGOUT START
export const logoutUser = () => {
   cookie.remove(`users`)
   return { type: `LOGOUT_SUCCESS` }
}
// USER LOGOUT END

// USER UPDATE PROFILE BUTTON START
export const userUpdate = (id, firstName, lastName, username, email, phoneNumber) => {
   return (dispatch) => {
      axios.patch(`/updateprofile/${id}`,
         {
            first_name: firstName,
            last_name: lastName,
            username: username,
            email: email,
            phone_number: phoneNumber
         }
      ).then(res => {
         const { id, first_name, last_name, username, password, email, verified, gender, address, avatar } = res.data

         dispatch({
            type: 'UPDATE_PROFILE_SUCCESS',
            payload: {
               id, first_name, last_name, username, password, email, verified, gender, address, avatar
            }
         })

         cookie.set(`users`, { id, first_name, last_name, username, password, email, verified, gender, address, avatar }, { path: `/` })
      })
   }
}
// USER UPDATE PROFILE BUTTON END

// USER UPDATE AVATAR START
export const userUpdateAvatar = (id, avatar, objUser) => {
   return (dispatch) => {
      const formData = new FormData()
      formData.append(`avatar`, avatar)

      axios.patch(`/updateavatar/${id}`, formData).then(res => {
         if (typeof (res.data) == 'number') {
            Swal.fire({
               type: `error`,
               title: `Error 404`,
               text: res.data
            })
         } else {
            const { id, first_name, last_name, username, email, gender, phone_number, verified } = objUser

            dispatch({
               type: `AVATAR_UPDATES_SUCCESS`,
               payload: {
                  avatar: res.data
               }
            })

            cookie.set(`users`, { id, first_name, last_name, username, email, gender, phone_number, verified, avatar: res.data }, { path: `/` })

            Swal.fire({
               position: `center`,
               type: `success`,
               title: `Success Upload User Avatar`,
               showConfirmButton: false,
               timer: 1500
            })

         }
      })
   }
}
// USER UPDATE AVATAR END

// /// USER CHANGE PASSWORD START
// export default userChangePassword = (id, oldPass, newPass, newPassConfirm) => {
//    return () => {
//       if (newPass == newPassConfirm) {
//          if (oldPass !== newPass) {
//             axios.patch(`/updatepassword/${id}`,
//                {
//                   oldPass,
//                   newPass
//                }
//             ).then(res => {
//                Swal.fire({
//                   position: `center`,
//                   type: `success`,
//                   title: `Success Updates Password`,
//                   showConfirmButton: false,
//                   timer: 1500
//                })
//             })
//          } else {
//             Swal.fire({
//                type: `error`,
//                title: `New password must be different`,
//                text: `Please change another password`
//             })
//          }
//       } else {
//          Swal.fire({
//             type: `error`,
//             title: `Invalid, password doesn't match`,
//             text: `Password and confirm password must be same`
//          })
//       }
//    }
// }
// /// USER CHANGE PASSWORD END

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
            cookie.set(`admins`, { id, username, password, email }, { path: `/admin ` })

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
         username: objAdmin.username
      }
   }
}
// ADMIN KEEP LOGIN END

// ADMIN LOGOUT START
export const logoutAdmin = () => {
   cookie.remove('admins')
   return { type: 'ADMIN_LOGOUT_SUCCESS' }
}
// ADMIN LOGOUT END

// ------------------------------------
// --------------ADMIN-----------------
// ---------------END------------------
// ------------------------------------

// ADD TO CART START
export const addCart = (user_id, first_name, last_name, phone_number, product_id, quantity, total_price) => {
   axios.patch(`/cart`,
      {
         user_id, first_name, last_name, phone_number, product_id, quantity, total_price
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