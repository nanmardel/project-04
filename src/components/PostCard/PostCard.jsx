import React, {useState} from "react";
import { Card, Icon, Image, Button, Form, Comment } from "semantic-ui-react";
import { Link } from "react-router-dom";
// import { deletePost } from '../../utils/postApi';
// import { create } from '../../utils/commentsApi';




function PostCard({ post, isProfile, user, removeLike, addLike, deletePost, handleAddComment }) {
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



// delete post
        let clickDelete = null;
        if (user) {
            clickDelete = post.user._id === user._id ? () => deletePost(post._id) : null;
        }

// comment section
        const [state, setState] = useState('')
        const [comment, setComment] = useState('')

        function handleChange(e){
            setState({
                ...state,
                [e.target.name]: e.target.value
            })
        }
        function handleSubmit(e){
            e.preventDefault()
            handleAddComment(post.Id, state, comment)
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

        <Comment.Group>
    <Comment>
      <Comment.Avatar as='a' src={post.user.photoUrl ? post.user.photoUrl :"https://react.semantic-ui.com/images/wireframe/square-image.png"} />
      <Comment.Content>
        <Comment.Author as='a'>{post.user.username}</Comment.Author>
        <Comment.Text onChange={handleChange} >{post.comment}</Comment.Text>
        <Form reply onClick={handleSubmit}>
          <Form.TextArea />
          <Button
            content='Comment'
            labelPosition='left'
            icon='pencil'
            primary
          />
        </Form>
      </Comment.Content>
    </Comment>
  </Comment.Group>
        </Card.Content>
    </Card>
    );
}

export default PostCard;






{/* <Form.TextArea onSubmit={handleSubmit}
type = 'text'
name="comment"
placeholder='leave a comment'
value={state.comment}
onChange={handleChange}
/>
<Button 
    basic color="blue"
    type="submit"
    className="btn"
    >
    Submit
</Button> */}