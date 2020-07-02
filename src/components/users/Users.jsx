import React from 'react'
import styles from './Users.module.css'
import userPhoto from '../../assets/images/userPhoto.png'
import { NavLink } from 'react-router-dom'
import Paginator from "./UsersPagination"
import { Button } from 'antd';


let Users = ({ currentPage, onPageChanged, totalItemsCount, pageSize, users, followingInProgress, unfollow, follow, friendsPage }) => {

    let filteredUsers = users.filter(item => !!item.followed)

    return <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
            totalItemsCount={totalItemsCount} pageSize={pageSize} />

        <div className={styles.usersPage}>

            {!!friendsPage ?
                filteredUsers.map(u => <div key={u.id}>
                    <div>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                    className={styles.usersPhoto} alt="" />
                            </NavLink>
                        </div>
                    </div>
                    <div className={styles.usersName}>
                        <div>{u.name}</div>
                        <div className={styles.status}>{u.status != null ? u.status : "No status"}</div>
                    </div>

                    <div>

                        {u.followed
                            ? <Button
                                style={{ marginTop: 5, width: 100 }}
                                type="default"
                                disable={followingInProgress.some(id => id === u.id)}
                                onClick={() => {
                                    unfollow(u.id)
                                }}>Unfollow</Button>

                            : <Button
                                style={{ marginTop: 5, width: 100 }}
                                type="primary"
                                disable={followingInProgress.some(id => id === u.id)}
                                onClick={() => {
                                    follow(u.id)
                                }}> Follow</Button>}
                    </div>
                </div>
                )
                :

                users.map(u => <div key={u.id}>
                    <div>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                    className={styles.usersPhoto} alt="" />
                            </NavLink>
                        </div>
                    </div>
                    <div className={styles.usersName}>
                        <div>{u.name}</div>
                        <div className={styles.status}>{u.status != null ? u.status : "No status"}</div>
                    </div>

                    <div>

                        {u.followed
                            ? <Button
                                style={{ marginTop: 5, width: 100 }}
                                type="default"
                                disable={followingInProgress.some(id => id === u.id)}
                                onClick={() => {
                                    unfollow(u.id)
                                }}>Unfollow</Button>

                            : <Button
                                style={{ marginTop: 5, width: 100 }}
                                type="primary"
                                disable={followingInProgress.some(id => id === u.id)}
                                onClick={() => {
                                    follow(u.id)
                                }}> Follow</Button>}
                    </div>
                </div>
                )}
        </div>
    </div>
}


export default Users