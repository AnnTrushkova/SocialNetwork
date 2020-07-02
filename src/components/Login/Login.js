import React from 'react'
import styles from './Login.module.css'
import {connect} from 'react-redux'
import {login} from '../../redux/login-reducer'
import LoginForm from './LoginForm'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'


const Login = (props) => {

    const onSubmit = (values) => {
        let {login, password} = values
        props.login(login, password)
    }

    return <div className={styles.login}>
        {!!props.isAuth && <Redirect to={'/profile'}/>}
        <h2>Login</h2>
        <LoginForm onSubmit={onSubmit}/>
    </div>
}

const mstp = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}


export default compose(
    connect(mstp, {login}))
(Login)