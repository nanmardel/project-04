import {useState} from 'react';
import { Button, Comment, Form } from 'semantic-ui-react'


export default function addComment(postId) {
    const [comment, setComment] = useState('')
    const [state, setState] = useState({
        body: ''
    })

    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        const comment = new Comment()
        comment.append('body', state.body)
        handleAddComment(postId);
    }

    return (
        <Form  autoComplete="off" onSubmit={handleSubmit}>
        <Form.TextArea
        type = 'text'
        name="comment"
        value={state.comment}
        onChange={handleChange}
        />
        <Button 
            basic color="blue"
            type="submit"
            className="btn"
            >
            Submit
            </Button>
        </Form>
    )

}