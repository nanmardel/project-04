import {useState} from 'react';
import { Button, Form } from 'semantic-ui-react'


export default function addComment({postId, handleAddComment}) { 
    const [state, setState] = useState({
        comment: '',
        // username: '',
    })

    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }


    function handleSubmit(e){
        e.preventDefault()
        handleAddComment({
            comment: state.comment,
            postId: postId,  
        })
    }
    return (
        <Form autoComplete='off' onSubmit={handleSubmit}>
            <Form.TextArea
            type='text'
            name='comment'
            value={state.comment}
            onChange={handleChange}
            />
            <Button
            basic color="blue"
            type="submit"
            className='btn'
            ></Button>
        </Form>
    )
}


