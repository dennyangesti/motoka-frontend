import { combineReducers } from 'redux'

const initUser = {
   id: '',
   first_name: '',
   last_name: '',
   username: '',
   email: '',
   gender: '',
   phone_number: '',
   avatar: '',
   address: '',
   verified: 0
}

const initAdmin = {
   id: '',
   username: '',
   email: '',
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
            phone_number: action.payload.gender,
            avatar: action.payload.avatar,
            address: action.payload.address,
            verified: action.payload.verified
         }

      case "LOGOUT_SUCCESS":
         return {
            initUser
         }

      case "UPDATE_PROFILE_SUCCESS":
         return {
            ...state,
            id: action.payload.id,
            first_name: action.payload.first_name,
            last_name: action.payload.last_name,
            username: action.payload.username,
            email: action.payload.email,
            gender: action.payload.gender,
            phone_number: action.payload.gender,
            avatar: action.payload.avatar,
            address: action.payload.address,
         }

      case "AVATAR_UPDATES_SUCCESS":
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
      case "ADMIN_LOGIN_SUCCESS":
         return {
            ...state,
            id: action.payload.id,
            username: action.payload.username,
            email: action.payload.email
         }

      case "ADMIN_LOGOUT_SUCCESS":
         return {
            initAdmin
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