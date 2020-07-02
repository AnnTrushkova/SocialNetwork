import {apiSdk} from '../dal/axios-instance'
import {profileAPI} from '../dal/axios-instance'


const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const SET_PHOTO = 'SET_PHOTO'

let initialState = {
    posts: [
        {
            id: 1,
            message: 'The United States has the largest economy in the world. The nation\'s economy accounts for about ' +
                '25% of the world\'s nominal GDP.',
            like: '25',
            img: 'https://i.pinimg.com/564x/5a/8d/25/5a8d2521133b241a3a739470920c8360.jpg',
            imgLikes: 'https://clipart.info/images/ccovers/1499793238facebook-love-emoji-like-png.png',
            imgReposts: 'https://avatanplus.com/files/resources/mid/57aab152121d515672c4a89a.png',
            reposts: '4'
        },
        {
            id: 2,
            message: 'Atlantic City has the world’s longest boardwalk. Built in 1870, it was also the first ' +
                'boardwalk in the United States. Its purpose was to limit the amount of sand beach goers took with them ' +
                'into hotel lobbies as well as the train. Today, it is a stretch of 4.5 miles long, and home to casinos,' +
                ' hotels, restaurants, and more.',
            like: '24',
            img: 'https://i.pinimg.com/564x/5a/8d/25/5a8d2521133b241a3a739470920c8360.jpg',
            imgLikes: 'https://clipart.info/images/ccovers/1499793238facebook-love-emoji-like-png.png',
            imgReposts: 'https://avatanplus.com/files/resources/mid/57aab152121d515672c4a89a.png',
            reposts: '10'

        },
        {
            id: 3,
            message: 'Hi',
            like: '155',
            img: 'https://i.pinimg.com/564x/5a/8d/25/5a8d2521133b241a3a739470920c8360.jpg',
            imgLikes: 'https://clipart.info/images/ccovers/1499793238facebook-love-emoji-like-png.png',
            imgReposts: 'https://avatanplus.com/files/resources/mid/57aab152121d515672c4a89a.png',
            reposts: '8'

        },
    ],
    newPostText: '',
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_POST:
            let newPost = {
                id: 1,
                message: state.newPostText,
                like: 0,
                img: 'https://i.pinimg.com/564x/5a/8d/25/5a8d2521133b241a3a739470920c8360.jpg',
                imgLikes: 'https://clipart.info/images/ccovers/1499793238facebook-love-emoji-like-png.png',
                imgReposts: 'https://avatanplus.com/files/resources/mid/57aab152121d515672c4a89a.png',
                reposts: 0
            }
            return {
                ...state,
                newPostText: '',
                posts: [newPost, ...state.posts]
            }

        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SET_PHOTO:
            return {
                ...state,
                ...state.profile.photos = action.photos
            }
        default:
            return state;

    }
}


export const addPost = () => ({type: ADD_POST});
export const updateNewPostText = (text) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const setPhotos = (photos) => ({type: SET_PHOTO, photos})


export const getUserProfile = (userId) => (dispatch) => {
    apiSdk.getProfile(userId).then(response => {
        dispatch(setUserProfile(response.data))
    })
}

export const getStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId).then(response => {
        dispatch(setStatus(response.data))
    })
}
export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    })
}

export const updateProfile = (values) => async (dispatch) => {
    let response = await profileAPI.updateProfile(values)
    if (response.resultCode === 0) {
        dispatch(getUserProfile(values.userId))
    }
}

export const updatePhoto = (formData) => async (dispatch, getState) => {
    let userId = getState().profilePage.profile.userId
    let response = await profileAPI.updatePhoto(formData)
    if (response.resultCode === 0) {
        dispatch(getUserProfile(userId))
    }
}


export default profileReducer

