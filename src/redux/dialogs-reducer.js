import {dialogsAPI} from "../dal/axios-instance"


const GET_DIALOGS_SUCCESS = 'GET_DIALOGS_SUCCESS'
const PUT_UP_DIALOG = 'PUT_UP_DIALOG'
const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS'
const SET_CURRENT_DIALOG = 'SET_CURRENT_DIALOG'
const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS'


let update = (state, action) => ({...state, ...action.payload})

let initialState = {
    dialogs: [],
    messages: [],
    selectedDialogId: null
}


const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DIALOGS_SUCCESS:
        case GET_MESSAGES_SUCCESS:
        case SET_CURRENT_DIALOG:
            return update(state, action)
        case PUT_UP_DIALOG:
            return {
                ...state,
                dialogs: [...state.dialogs.find(d => d.id == action.userId),
                    ...state.dialogs.filter(d => d.id !== action.userId)]
            }
        case SEND_MESSAGE_SUCCESS:
            return {
                ...state, messages: [...state.messages, action.messages]
            }
        default:
            return state
    }
}


export const getDialogsSuccess = (dialogs) => ({type: GET_DIALOGS_SUCCESS, payload: {dialogs}})
export const sendMessageSuccess = (message) => ({type: SEND_MESSAGE_SUCCESS, message})
export const putUpDialog = (userId) => ({type: PUT_UP_DIALOG, userId})
export const getMessagesSuccess = (messages) => ({type: GET_MESSAGES_SUCCESS, payload: {messages}})
export const setCurrentDialog = (selectedDialogId) => ({type: SET_CURRENT_DIALOG, payload: {selectedDialogId}})


export const getDialogs = () => async (dispatch) => {
    let dialogs = await dialogsAPI.getDialogs()
    dispatch(getDialogsSuccess(dialogs))
}

export const sendMessage = (userId, body) => async (dispatch) => {
    let result = await dialogsAPI.sendMessage(userId, body)
    if (result.resultCode === 0) {
        dispatch(sendMessageSuccess(result.data.message))
    }
}

export const startDialog = (userId) => async (dispatch, getState) => {
    await dialogsAPI.startDialog(userId)
    let dialog = getState().dialogs.dialogs.find(d => d.id == userId)
    if (dialog) {
        dispatch(putUpDialog(userId))
    } else {
        dispatch(getDialogs())
    }
}

export const getMessages = (userId) => async (dispatch) => {
    let messages = await dialogsAPI.getMessages(userId)
    dispatch(getMessagesSuccess(messages))
}

export const init = (userId) => async (dispatch) => {
    if (!!userId) {
        dispatch(getMessages(userId))
        dispatch(setCurrentDialog(userId))
        await dispatch(startDialog(userId))
        dispatch(getDialogs())
    } else {
        dispatch(getDialogs())
    }
}

export const updateDialog = (userId) => (dispatch) => {
    if (!!userId) {
        dispatch(getMessages(userId))
        dispatch(setCurrentDialog(userId))
    } else {
        dispatch(setCurrentDialog(null))
    }
}


export default dialogsReducer