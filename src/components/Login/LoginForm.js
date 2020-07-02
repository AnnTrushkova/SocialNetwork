import React from 'react'
import styles from './Login.module.css'
import {Field, reduxForm} from 'redux-form'


const LoginForm = (props) => {

    return <div>

        <form onSubmit={props.handleSubmit}>
            <div>
                <Field className={styles.field} placeholder={"Login"}
                       name="login" component={Input}/>
            </div>
            <div>
                <Field className={styles.field} placeholder={"Password"} name="password"
                       type="password" component={Input}/>
            </div>
            <div>
                <Field component={Input}
                       name="rememberMe" type={"checkbox"}/> remember me
            </div>
            <div>
                <button className={styles.loginButton}>Login</button>
            </div>
        </form>

    </div>
}


const Input = ({input, meta, ...props}) => {
    return <div>
        {meta.touched && meta.invalid && <div style={{color: 'red'}}>{meta.error}</div>}
        <input {...props} {...input} />
    </div>
}

export default reduxForm({form: 'login'})(LoginForm)
