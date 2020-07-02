import React from 'react'
import styles from './User.module.css'
import { withRouter } from 'react-router-dom'
import instance from '../../dal/axios-instance'


class User extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            profile: null,
            editMode: false,
            me: null,
            isOwner: false
        }
    }

    componentDidMount() {

        let userIDFromURL = this.props.match.params.userID
        let profilePromise = instance.get(`profile/` + userIDFromURL)
            .then((res) => {
                this.setState({ profile: res.data })
            })
        let mePromise = instance.get(`auth/me`)
            .then((res) => {
                this.setState({ me: res.data.data })
            })

        Promise.all([profilePromise, mePromise]).then(() => {
            let { profile, me } = this.state
            if (!!me && !!profile && me.id === profile.userID) {
                this.setState({ isOwner: true })
            }
        })
    }

    onEditClick = () => {
        this.setState({ editMode: true })
    }

    onContactChange = (newValue, contactKey) => {
        this.state.profile.contacts[contactKey] = newValue
        this.forceUpdate()
    }

    onSaveClick = () => {
        instance.put(`profile`, this.state.profile)
            .then((res) => { })
        this.setState({ editMode: false })
    }

    onAboutMeChange = (e) => {
        let newValue = e.currentTerget.value
        this.state.aboutMe = newValue
        this.forseUpdate()
    }


    render() {

        let { isOwner, profile, editMode } = this.state

        if (profile) {
            return <div className={styles.user}>
                <h2>{this.state.profile.fullName}</h2>
                {isOwner && <span onClick={this.onEditClick}>edit</span>}
                <div>
                    <div>
                        {editMode ? <textarea
                            value={profile.aboutMe}
                            onChange={this.onAboutMeChange} /> : profile.aboutMe}
                    </div>
                    {
                        Object.keys(profile.contacts).map(key => {
                            return <div>
                                <b>{key}: </b>
                                {editMode ? <input value={profile.contacts[key]}
                                    onChange={(e) => {
                                        let newValue = e.target.value
                                        this.onContactChange(newValue, key)
                                    }} /> :
                                    <span>{profile.contacts[key]}</span>}
                            </div>
                        })
                    }
                    {editMode ? <input type='checkbox'
                        checked={profile.lookingForAJob}
                        onChange={(e) => {
                            let checked = e.currentTarget.checked
                            this.onLookingForAJobChange(checked)
                        }

                        } />
                        : <div> Ищу работу</div>}
                    {editMode && <button onClick={this.onSaveClick}>Save</button>}

                </div>
            </div>
        } else {
            return <div>Loading</div>
        }
    }
}


export default withRouter(User)