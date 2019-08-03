
import axios from '../config/axios'
import cookies from 'universal-cookie'


const cookie = new cookies()

export const onLoginUser = (user, pass) => {
   // Tembak data ke database
   return (dispatch) => { // Dispatch adalah function
      axios.get(
         'http://localhost:2019/users',
         {
            params: {
               username: user,
               password: pass
            }
         }

      ).then(res => {

         if (res.data.length > 0) {

            const { id, username } = res.data[0]

            dispatch({
               type: "LOGIN_SUCCESS",
               payload: { id, username }

            })

            // Membuat data untuk cookie
            cookie.set('userName', { id, username }, { path: '/' })

         } else {
            alert('Username or Password not found')

         }

         console.log(res)

      }).catch(err => {
         alert('Gagal Login')
         console.log(err)
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