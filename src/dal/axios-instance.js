import * as axios from 'axios'


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '1115f373-907f-408a-9a23-c2d6df0ab207'
    }
})


export const apiSdk = {
    getUsers(currentPage = 1, pageSize = 20) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    follow(userId) {
        return instance.post('/follow/' + userId).then((response) => {
            return response.data
        })
    },

    unfollow(userId) {
        return instance.delete('/follow/' + userId).then((response) => {
            return response.data
        })
    },
    getProfile(userId) {
        return profileAPI.getProfile(userId)
    },

    login(email, password, rememberMe = false, captcha = null) {
        debugger
        return instance.post(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        })
            .then((response) => {
                debugger
                return response.data
            })
    },
    getCaptcha() {
        return instance.get(`security/get-captcha-url`)
            .then((response) => response.data)
    },
    logOut() {
        return instance.post(`auth/logout`)
            .then((response) => response.data)
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status: status })
    },
    updateProfile(values) {
        return instance.put(`profile`, values)
            .then(res => res.data)
    },
    updatePhoto(formData) {
        return instance.put(`profile/photo`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => res.data)
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me/`)
    }
}

export const dialogsAPI = {

    getDialogs() {
        return instance.get(`dialogs`)
            .then(res => res.data)
    },
    startDialog(userId) {
        return instance.put(`dialogs/${userId}`)
            .then(res => res.data)
    },
    getMessages(userId) {
        return instance.get(`dialogs/${userId}/messages`)
            .then(res => res.data.items)
    },
    sendMessages(userId, body) {
        return instance.post(`dialogs/${userId}/messages`, body)
            .then(res => res.data)
    }

}


export default instance