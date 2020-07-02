import React from 'react'
import styles from './Profile.module.css'
import MyPostsContainer from "./MyPosts/MyPostsContainer"
import ProfileInfoContainer from "./ProfileInfo/ProfileInfoContainer"
import ProfileImage from '../../assets/images/ProfileImage.png'


const Profile = (props) => {
    return (
        <div className={styles.profile}>
            <div className={styles.content}>
                <img src={ProfileImage} alt="" />
            </div>
            <div>
                <ProfileInfoContainer
                    {...props}
                />
            </div>
            <div className={styles.myPost}>
                <MyPostsContainer />
            </div>
        </div>
    )
}

export default Profile