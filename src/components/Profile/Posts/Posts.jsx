import React, { useState } from 'react'
import s from './Posts.module.css'
import { Button } from 'antd'
import { LikeOutlined, NotificationOutlined } from '@ant-design/icons'


const Posts = ({ img, message, reposts }) => {
    const [count, setCount] = useState({ count: 0, flag: false });

    const onLikeClick = () => {
        console.log(count.count)
        !count.count ?
            setCount({ count: 1, flag: true })
            :
            setCount({ count: 0, flag: false })
    }

    return (
        <div className={s.profileInfo}>
            <div>
                <img className={s.profileImg} src={img} />
            </div>
            <div>
                <div className={s.messages}>
                    {message}
                </div>
                <div className={s.imgPosts}>

                    <Button
                        onClick={onLikeClick}
                        className={!!count.count ? s.likeButton : s.postsButtons}
                    >
                        <LikeOutlined />
                    </Button>

                    {!!count.count && <span className={s.like}>{count.count}</span>}

                    <Button
                        className={s.postsButtons}
                    >
                        <NotificationOutlined />
                    </Button>

                    <span className={s.reposts}>{reposts} </span>
                </div>
            </div>
        </div>
    )
}


export default Posts