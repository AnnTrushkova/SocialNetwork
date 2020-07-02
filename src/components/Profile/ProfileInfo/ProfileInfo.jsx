import React from 'react'
import styles from './ProfileInfo.module.css'
import Preloader from '../../common/PreLoader/PreLoader'
import userPhoto from '../../../assets/images/userPhoto.png'
import ProfileStatus from '../ProfileStatus/ProfileStatus'
import ProfileInfoForm from './ProfileInfoForm'
import { Button } from 'antd'


const ProfileInfo = (props) => {
    console.log(props)
    if (!props.profile) {
        return <Preloader />
    }

    const onButtonClick = () => {
        props.activateEditMode()
    }

    const onSubmit = (values) => {
        props.activateEditMode()
        props.updateProfile(values)

    }

    const changePhoto = () => {
        let formData = new FormData();
        let imagefile = document.querySelector('#photo')
        formData.append('image', imagefile.files[0])
        props.updatePhoto(formData)
    }

    return (
        <div>
            <div>
                <img src={props.profile.photos.small != null ? props.profile.photos.small : userPhoto}
                    className={styles.userPhoto} alt="" />

                <ProfileStatus status={props.status} updateStatus={props.updateStatus} />

                <div className={styles.btnDownload}>
                    <input className={styles.btn} type='button' value='Download File'></input>
                    <input className={styles.file} onChange={changePhoto} type='file' id={'photo'} />
                </div>
            </div>
            {!props.editMode ?
                <div>
                    <div className={styles.profileInfo}>

                        <div className={styles.firstColumn}>
                            <div> Full Name: {props.profile.fullName} </div>
                            <div> About Me:{props.profile.aboutMe} </div>
                            <div> Facebook: {props.profile.contacts.facebook} </div>
                            <div> GitHub: {props.profile.contacts.github} </div>
                            <div> Instagram: {props.profile.contacts.instagram} </div>
                            <div> MainLink: {props.profile.contacts.mainLink} </div>
                        </div>

                        <div className={styles.secondColumn}>
                            <div> Twitter: {props.profile.contacts.twitter} </div>
                            <div> VK: {props.profile.contacts.vk} </div>
                            <div> Website: {props.profile.contacts.website} </div>
                            <div> YouTube: {props.profile.contacts.youtube} </div>
                            <div> Loking for a job: {props.profile.lookingForAJob} </div>
                            <div> Loking for a job description: {props.profile.lookingForAJobDescription}</div>
                        </div>
                    </div>
                    <div>
                        <Button
                            className={styles.btn}
                            style={{ marginBottom: 20 }}
                            onClick={onButtonClick}
                            type="primary"
                        >
                            Update profile info
                         </Button>
                    </div>
                </div>
                :
                <ProfileInfoForm initialValues={props.profile} onSubmit={onSubmit} />
            }
        </div>
    )
}


export default ProfileInfo

