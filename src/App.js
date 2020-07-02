import React from 'react'
import './App.css'
import { BrowserRouter, Route, Link } from "react-router-dom"
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import DialogsContainer from "./components/Dialogs/Dialogs"
import UsersContainer from "./components/users/UsersContainer"
import FriendsContainer from "./components/Friends/FriendsContainer"
import Login from './components/Login/Login'
import HeaderContainer from "./components/Header/HeaderContainer"
import ProfileContainer from "./components/Profile/ProfileContainer"
import NewsContainer from "./components/News/NewsContainer"
import { initializeApp } from './redux/app-reducer'
import PreLoader from './components/common/PreLoader/PreLoader'
import Video from "./components/Video/VideoNavbar"
import 'antd/dist/antd.css'
import './index.css'
import { Layout, Menu } from 'antd'
import {
    PieChartOutlined,
    MailOutlined,
    UsergroupAddOutlined,
    UserSwitchOutlined,
    PictureOutlined,
    SoundOutlined,
    VideoCameraOutlined,
    ProfileOutlined,
    SettingOutlined
} from '@ant-design/icons'


const { Header, Content, Sider } = Layout

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {

        if (!this.props.initialized) {
            return <PreLoader />
        }

        const menu = [
            { to: '/profile', title: 'Profile', img: <PieChartOutlined /> },
            { to: '/dialogs', title: 'Messages', img: <MailOutlined /> },
            { to: '/users', title: 'Users', img: <UsergroupAddOutlined /> },
            { to: '/friends', title: 'Friends', img: <UserSwitchOutlined /> },
            { to: '/photo', title: 'Photo', img: <PictureOutlined /> },
            { to: '/music', title: 'Music', img: <SoundOutlined /> },
            { to: '/video', title: 'Video', img: <VideoCameraOutlined /> },
            { to: '/news', title: 'News', img: <ProfileOutlined /> },
            { to: '/settings', title: 'Settings', img: <SettingOutlined /> },
        ];

        return (
            <BrowserRouter>

                <Layout className="main-app-content">

                    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                        <HeaderContainer />
                    </Header>

                    <Layout style={{ marginTop: 64 }}>
                        <Sider width={250} className="site-layout-background">
                            <Menu
                                mode="inline"
                            
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                {menu.map((m, index) =>
                                    <Menu.Item key={index} icon={m.img}>
                                        <Link to={m.to}>{m.title}</Link>
                                    </Menu.Item>
                                )}

                            </Menu>
                        </Sider>

                        <Layout style={{ padding: '0 20px 0' }}>

                            <Content
                                className="site-layout-background"
                                style={{
                                    marginTop: 20,
                                    minHeight: 280,
                                }}
                            >
                                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                                    <Route path='/dialogs/:userId?' render={() => <DialogsContainer />} />
                                    <Route path='/users' render={() => <UsersContainer />} />
                                    <Route path='/friends' render={() => <FriendsContainer />} />
                                    <Route path='/login' render={() => <Login />} />
                                    <Route path='/video' render={() => <Video />} />
                                    <Route path='/news' render={() => <NewsContainer />} />
                                    <Route exact path='/profile/:userId?' render={() => <ProfileContainer />} />
                                </div>

                            </Content>
                        </Layout>
                    </Layout>
                </Layout>

            </BrowserRouter>
        )
    }
}

let mstp = (state) => ({
    initialized: state.app.initialized
})

export default compose(
    withRouter,
    connect(mstp, { initializeApp }))(App)
