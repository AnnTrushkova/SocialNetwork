import React from 'react'
import ProfileInfo from './ProfileInfo'
import { connect } from 'react-redux'
import { updateProfile, updatePhoto } from '../../../redux/profile-reducer'


class ProfileInfoContainer extends React.Component {

    state = {
        editMode: false
    }

    activateEditMode = () => {
        this.setState({
            editMode: !this.state.editMode
        })
    }

    changePhoto = () => {
        let formData = new FormData()
        let imagefile = document.querySelector('#photo')
        formData.append('image', imagefile.files[0])
        this.props.updatePhoto(formData)

    }

    render() {
        return <div>
            <ProfileInfo {...this.props}
                activateEditMode={this.activateEditMode}
                editMode={this.state.editMode}
                changePhoto={this.changePhoto} />
        </div>
    }
}


export default connect(null, { updateProfile, updatePhoto })(ProfileInfoContainer)