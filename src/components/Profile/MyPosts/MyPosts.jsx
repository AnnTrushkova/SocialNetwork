import React from 'react'
import s from './MyPosts.module.css'
import Posts from "../Posts/Posts"
import { Input, Button } from 'antd'


const { TextArea } = Input

const MyPosts = ({ posts, addPost, updateNewPostText, newPostText }) => {

    let postsElements = posts.map(p =>
        <Posts key={p.id} id={p.id} message={p.message} like={p.like} img={p.img} imgLikes={p.imgLikes}
            imgReposts={p.imgReposts} reposts={p.reposts} />)


    let onAddPost = () => {
        addPost()
    }

    let onPostChange = (e) => {
        console.log(e.target.value)
        let text = e.target.value
        updateNewPostText(text)
    }

    return (
        <div className={s.description}>


            <TextArea
                placeholder="Add new posts"
                autoSize={{ minRows: 2, maxRows: 6 }}
                onChange={onPostChange}

                value={newPostText}
            />

            <div>
                <Button
                    type="primary"
                    onClick={onAddPost}
                    style={{
                        marginTop: "10px",
                        position: "absolute",
                        right: "0",
                        marginRight: 60
                    }}
                >
                    Add Post
            </Button>
            </div>


            <div>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts