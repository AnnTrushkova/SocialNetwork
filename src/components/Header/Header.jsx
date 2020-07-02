import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'
import logo from '../../assets/images/logo.png'
import { Button } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'

const Header = (props) => {

    const logOut = () => {
        props.logOut()
    }

    return (

        <header className={styles.header}>
            <div>
                <NavLink to="/profile">
                    <img src={logo} className={styles.toHomeLink} alt="" />
                    <span className={styles.auth}>
                        {props.isAuth ? props.login
                            : <span to='/auth/me' className={styles.active}></span>}
                    </span>
                </NavLink>
            </div>

            <div>
                {!props.isAuth
                    ? <NavLink to="/login"></NavLink>
                    :
                    <Button
                        type="primary"
                        onClick={logOut}
                    >
                        Exit
                        <LogoutOutlined />
                    </Button>
                }
            </div>
        </header>
    )
}


export default Header