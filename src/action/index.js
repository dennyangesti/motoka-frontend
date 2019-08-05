
import axios from '../config/axios'
import cookies from 'universal-cookie'


const cookie = new cookies()

export const onLoginUser = (username, password) => {
   // Tembak data ke database
   return (dispatch) => { // Dispatch adalah function

      axios.post(`/users/login`, {
         username, password

      }).then(res => {
         const { id, username } = res.data

         dispatch(
            {
               type: 'LOGIN_SUCCESS',
               payload: {
                  id, username
               }
            }
         )
         cookie.set('userName', { id, username }, { path: '/' })
      })
   }
}


export const keepLogin = (objUser) => {

   // objUser = {id, username}
   return {
      type: "LOGIN_SUCCESS",
      payload: {
         id: objUser.id,
         username: objUser.username
      }
   }
}


export const onLogoutUser = () => {

   cookie.remove('userName')
   return {
      type: 'LOGOUT_SUCCESS'
   }

}