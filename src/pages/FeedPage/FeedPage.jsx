import React, {useState, useEffect} from 'react';
import PageHeader from '../../components/Header/Header';
import AddPostForm from '../../components/AddPostForm/AddPostForm';
import PostGallery from '../../components/PostGallery/PostGallery';
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import * as commentsAPI from "../../utils/commentsApi";
import * as postsAPI  from '../../utils/postApi'
import * as likesAPI from '../../utils/likeApi';

import Loading from "../../components/Loader/Loader";


import {Grid} from "semantic-ui-react";


export default function Feed({user,handleLogout}){
    console.log(postsAPI, "<-- postAPI")
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState('');
    const [error, setError] = useState('');

    async function addLike(postId) {
        try {
            const data = await likesAPI.create(postId)
            console.log(data, '<-- the response from the server when we make a like');
            getPosts();
        } catch(err){
            console.log(err)
            setError(err.message)
        }
    }

    async function removeLike(likeId){
        try {
            const data = await likesAPI.create(likeId)
            console.log(data, '<- this is the response from the server when we remove a like');
            getPosts()
        }catch(err) {
            console.log(err);
            setError(err.message);
        }
    }


    // C create in CRUD
    async function handleAddPost(post){
        try{
            setLoading(true);
            const data = await postsAPI.create(post);
            console.log(data, "this is a response from the server, in handleAddPost");
            setPosts([data.post, ...posts]);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    }


    // R read in crud
    async function getPosts() {
        try {
            const data = await postsAPI.getAll();
            console.log(data, "this is data");
            setPosts([...data.posts]);
            setLoading(false);
        } catch (err) {
            console.log(err.message, "this is an error");
            setError(err.message);
        }
    }

    useEffect(() => {
        getPosts();
    }, []);
    

    const deletePost = async (postId) => {
        try {
            const data = await postsAPI.deletePost(postId);
            const postArray = await posts.filter(post => post._id !== postId);
            setPosts(postArray);
        } catch(err) {
            console.log(err, '<==== err from revomePost')
            setError(err);
        }
    }

    const handleAddComment = async (postId, comments) => {
        try {
            const data = await commentsAPI.create(postId, comments)
            setComments([data.comments, ...comments]);
            setLoading(false);
        } catch(err){
            setError(err);
        }
    }

    if (error) {
        return (
        <>
            <PageHeader handleLogout={handleLogout} user={user}/>
            <ErrorMessage error={error} />;
        </>
        );
    }
    
    if (loading) {
        return (
        <>
            <PageHeader handleLogout={handleLogout} user={user}/>
            <Loading />
        </>
        );
    } 
    
    return (
        <Grid centered>
        <Grid.Row>
            <Grid.Column>
            <PageHeader handleLogout={handleLogout} user={user}/>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column style={{ maxWidth: 450 }}>
            <AddPostForm handleAddPost={handleAddPost} />
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column style={{ maxWidth: 450 }}>
            <PostGallery
                posts={posts}
                numPhotosCol={1}
                isProfile={false}
                loading={loading}
                addLike={addLike}
                removeLike={removeLike}
                deletePost={deletePost}
                user={user}
                handleAddComment={handleAddComment}
            />
            </Grid.Column>
        </Grid.Row>
        </Grid>
    );
}