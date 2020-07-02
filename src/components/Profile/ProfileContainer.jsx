import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { getUserProfile, getStatus, updateStatus } from '../../redux/profile-reducer'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import withAuthRedirect from '../../hoc/newAuthRedirect'


class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = 1056
    }
    this.props.getUserProfile(userId)
    this.props.getStatus(userId)
  }

  componentDidUpdate(prevProps, prevState) {
    let userId = this.props.match.params.userId
    if (prevProps.match.params.userId !== userId) {
      this.props.getUserProfile('1056')
    }
  }

  render() {
    return (
      <Profile {...this.props} />
    )
  }
}

let mstp = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status
})


export default compose(
  withRouter,
  withAuthRedirect,
  connect(mstp, { getUserProfile, getStatus, updateStatus }),
)(ProfileContainer)