import React from 'react'
import { Field, reduxForm } from 'redux-form'
import styles from "./ProfileInfo.module.css"

const ProfileInfoForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={styles.profileInfo}>
                <div className={styles.firstColumn}>
                    <div>FullName <Field name="fullName" component={Input} /></div>
                    <div>About Me<Field name="aboutMe" component={Input} /></div>
                    <div>Facebook<Field name="contacts.facebook" component={Input} /></div>
                    <div>Github<Field name="contacts.github" component={Input} /></div>
                    <div>Instagram<Field name="contacts.instagram" component={Input} /></div>
                    <div>MainLink<Field name="contacts.mainLink" component={Input} /></div>
                </div>
                <div className={styles.secondColumn}>
                    <div>Twitter<Field name="contacts.twitter" component={Input} /></div>
                    <div>Vk<Field name="contacts.vk" component={Input} /></div>
                    <div>Website<Field name="contacts.website" component={Input} /></div>
                    <div>Youtube<Field name="contacts.youtube" component={Input} /></div>
                    <div>Looking for a job<Field name="lookingForAJob" type='checkbox' component={Input} /></div>
                    <div>Looking for a job description<Field name="lookingForAJobDescription" component={Input} /></div>
                </div>
            </div>
            <button className={styles.button} style={{ marginBottom: 20 }}>Save Profile</button>
        </form>
    )
}


const Input = ({ input, meta, ...props }) => {
    return <div>
        {meta.touched && meta.invalid && <div style={{ color: 'red' }}>{meta.error}</div>}
        <input {...props} {...input} />
    </div>
}

export default reduxForm({ form: 'profileInfo' })(ProfileInfoForm)
