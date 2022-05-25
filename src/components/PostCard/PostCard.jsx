import React from "react";
import { Card, Icon, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {deletePost} from '../../utils/postApi';

// const BASE_URL = '/api'


function PostCard({ post, isProfile, user, removeLike, addLike, deletePost }) {
    const likeIndex = post.likes.findIndex(
    (like) => like.username === user.username
    );

    const clickHandler =
    likeIndex > -1
        ? () => removeLike(post.likes[likeIndex]._id)
        : () => addLike(post._id);

  // if the logged users id exists, the heart should be red, because the logged in user has liked the post
  // and the clicked handler should removeLike
    const likeColor = likeIndex > -1 ? "red" : "grey";

  // if the logged users id doesn't exist in the post.likes array, then the heart should be
  // grey, because the user hasn't liked the post, and the click handler should be addLike


        let clickDelete = null;
        if (user) {
            clickDelete = post.user._id === user._id ? () => deletePost(post._id) : null;
            console.log(post.user._id)
            console.log(user._id)
        }
    return (
    <Card key={post._id} raised>
        {isProfile ? (
        ""
        ) : (
        <Card.Content textAlign="left">
            <Card.Header>
            <Link to={`/${post.user.username}`}>
                <Image
                size="large"
                avatar
                src={
                    post.user.photoUrl
                    ? post.user.photoUrl
                    : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                }
                />
                {post.user.username}
            </Link>
            </Card.Header>
        </Card.Content>
        )}

        <Image src={`${post.photoUrl}`} wrapped ui={false} />
        <Card.Content>
        <Card.Description>{post.caption}</Card.Description>
        </Card.Content>
        <Card.Content extra textAlign={"right"}>
        <Button basic color="blue" type='submit' className='btn' onClick={clickDelete}>Delete</Button>

        <Icon
            name={"heart"}
            size="large"
            color={likeColor}
            onClick={clickHandler}
        />
        {post.likes.length} Likes
        </Card.Content>
    </Card>
    );
}

export default PostCard;


// onClick={`${post.deletePost(post._id)}`}
// onClick={`${deletePost(post._id)}`}