import React from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { logOut } from '../../redux/login-reducer'


class HeaderContainer extends React.Component {

  render() {
    return (
      <Header {...this.props} />
    )
  }
}

let mstp = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
})


export default connect(mstp, { logOut })(HeaderContainer)