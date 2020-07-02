import {addPost, updateNewPostText} from '../../../redux/profile-reducer'
import MyPosts from "./MyPosts"
import {connect} from "react-redux"


const mstp = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}


const MyPostsContainer = connect(mstp, {addPost, updateNewPostText})(MyPosts)


export default MyPostsContainer