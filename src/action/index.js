
import axios from '../config/axios'
import cookies from 'universal-cookie'


const cookie = new cookies()

export const onLoginUser = (username, password) => {
   // Tembak data ke database
   return async (dispatch) => { // Dispatch adalah function

      const res = await axios.post(`/users/login`, {
         username, password
      })

      try {
         if (typeof (res.data) === 'string') {
            console.log(res.data)
         } else {

            const { id, username, email, password, name, phone_number, gender, address, avatar } = res.data

            // set cookie
            cookie.set('userName', { id, username, email, password, name, phone_number, gender, address, avatar })

            dispatch({
               type: 'LOGIN_SUCCESS',
               payload: {
                  id, username, email, password, name, phone_number, gender, address, avatar
               }
            });
         }

      } catch (err) {
         console.log(err)
      }
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