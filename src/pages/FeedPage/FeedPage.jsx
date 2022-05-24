import React, {useState, useEffect} from 'react';
import PageHeader from '../../components/Header/Header';
import AddPost from '../../components/AddPostForm/AddPostForm';
import PostFeed from '../../components/PostFeed/PostFeed';
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import * as postsAPI from '../../utils/postApi'





export default function Feed({user,handleLogout}){
    const [posts, setPosts] = useState([])

    async function handleAddPost (post) {
        console.log(post)
        const data = await postsAPI.create(post);
        console.log(data.post, "<== this is a new post", data, '<--data variable')
        setPosts(posts => [data.post, ...posts])
    }
    return(
        <>
        <PageHeader />
        <AddPost  handleAddPost={handleAddPost}/>
        <PostFeed />
        </>
    )
}