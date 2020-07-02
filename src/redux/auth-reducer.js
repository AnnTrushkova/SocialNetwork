import { authAPI } from '../dal/axios-instance'


const SET_USER_DATA = 'SET_USER_DATA'
const SET_IS_AUTH = 'SET_IS_AUTH'

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:

      return {
        ...state,
        ...action.data
      }
    case SET_IS_AUTH:
      return {
        ...state,
        isAuth: action.isAuth
      }

    default:
      return state;
  }
}


export const setAuthUserData = (id, email, login) => ({ type: SET_USER_DATA, data: { id, email, login } })
export const setIsAuth = (isAuth) => ({ type: SET_IS_AUTH, isAuth })


export const getAuthUserData = () => (dispatch) => {
  return authAPI.me()
    .then(response => {
      if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data
        dispatch(setAuthUserData(id, email, login))
        dispatch(setIsAuth(true))
      }
    })
}


export default authReducer

