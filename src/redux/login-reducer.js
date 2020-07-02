import { apiSdk } from '../dal/axios-instance';
import { getAuthUserData, setIsAuth } from './auth-reducer'


const CHANGE_INPUT_VALUE = 'SN/LOGIN/CHANGE_INPUT_VALUE'


let initialState = {
    status: 'none', //in-progress, error, success
    errorMessage: 'Some error',
    email: '',
    password: '',
    rememberMe: true,
    captchaRequired: true,
    captchaValue: 'rtwr',
    captchaUrl: ''
}

const loginReducer = (state = initialState, action) => {

    switch (action.type) {
        case CHANGE_INPUT_VALUE:
            return {
                ...state, [action.propertyName]: action.propertyValue
            }
        default:
            return state
    }
}


export const changeInputValue = (propertyName, propertyValue) => ({
    type: CHANGE_INPUT_VALUE, propertyName, propertyValue
})


export const login = (email, password, rememberMe) => async (dispatch, getState) => {

    dispatch(changeInputValue("status", "in-progress"))

    let result = await apiSdk.login(email, password, rememberMe)
    if (result.resultCode === 1) {
        dispatch(changeInputValue("errorMessage", result.messages[0]))
        dispatch(changeInputValue("status", "error"))
    } else if (result.resultCode === 10) {
        dispatch(changeInputValue("captchaRequired", true))
        dispatch(changeInputValue("errorMessage", result.messages[0]))
        dispatch(changeInputValue("errorMessage", result.messages[0]))
        dispatch(changeInputValue("status", "error"))

        let captchaResult = await apiSdk.getCaptcha()
        dispatch(changeInputValue("captchaUrl", captchaResult.url))
    } else if (result.resultCode === 0) {
        debugger
        dispatch(getAuthUserData())
    }
}

export const logOut = () => async (dispatch) => {
    let result = await apiSdk.logOut()
    if (result.resultCode === 0) {
        dispatch(setIsAuth(false))
    }
}


export default loginReducer
