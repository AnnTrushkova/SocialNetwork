import React from 'react'
import Users from '../users/Users'
import { connect } from 'react-redux'
import { follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers } from '../../redux/users-reducer'
import PreLoader from '../common/PreLoader/PreLoader'
import { compose } from 'redux'


class FriendsContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <PreLoader /> : null}

            <Users
                {...this.props}
                onPageChanged={this.onPageChanged}
                friendsPage={true}
            />
        </>
    }
}



let mstp = (state) => {
    let { users, pageSize, totalUsersCount, currentPage, isFetching, followingInProgress } = state.usersPage
    return {
        users, pageSize, totalUsersCount, currentPage, isFetching, followingInProgress
    }
}


export default compose(
    connect(mstp, { follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers })
)(FriendsContainer)
