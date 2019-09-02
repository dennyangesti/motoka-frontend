import { combineReducers } from 'redux'

const initUser = {
   id: '',
   first_name: '',
   last_name: '',
   username: '',
   email: '',
   gender: '',
   avatar: '',
   address: '',
}

const initAdmin = {
   id: '',
   username: '',
}

const userReducer = (state = initUser, action) => {
   switch (action.type) {
      case "LOGIN_SUCCESS":
         return {
            ...state,
            id: action.payload.id,
            first_name: action.payload.first_name,
            last_name: action.payload.last_name,
            username: action.payload.username,
            email: action.payload.email,
            gender: action.payload.gender,
            avatar: action.payload.avatar,
            address: action.payload.address,
         }

      case "LOGOUT_SUCCESS":
         return {
            ...state,
            id: '',
            username: ''
         }

      case 'PROFILE_UPDATE_SUCCESS':
         return {
            ...state,
            id: action.payload.id,
            first_name: action.payload.first_name,
            last_name: action.payload.last_name,
            username: action.payload.username,
            email: action.payload.email,
            gender: action.payload.gender,
            avatar: action.payload.avatar,
            address: action.payload.address
         }

      case 'PROFILE_PICTURE_UPLOADED':
         return {
            ...state,
            avatar: action.payload.avatar
         }

      default:
         return state
   }

}

const adminReducer = (state = initAdmin, action) => {
   switch (action.type) {
      case "LOGIN_ADMIN":
         return {
            ...state,
            id: action.payload.id,
            username: action.payload.username,
         }

      case "LOGOUT_ADMIN":
         return {
            ...state,
            id: '',
            username: ''
         }

      default:
         return state
   }

}

export default combineReducers(
   {
      auth: userReducer,
      admin_auth: adminReducer
   }
)