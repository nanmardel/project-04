import React, {useState} from 'react';
import { Button, Form, Grid, Segment, Header } from 'semantic-ui-react';
import "./AddPostForm.css";



export default function AddPostForm(props){
    const [selectedFile, setSelectedFile] = useState('')
    const [state, setState] =useState({
        caption: ''
    })

    function handleFileInput(e){
        setSelectedFile(e.target.files[0])
    }
    function handleChange(e){
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    function handleSubmit(e){
        e.preventDefault()

        const formData = new FormData()
        formData.append('photo', selectedFile)
        formData.append('caption', state.caption)
        props.handleAddPost(formData);
    }
    return(
        <>
        <Header as='h1'>STUDIO</Header>

    <Grid textAlign='center' style={{ height: '25vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
        <Segment>
        
            <Form  autoComplete="off" onSubmit={handleSubmit}>
            
            <Form.Input
                className="form-control"
                name="caption"
                value={state.caption}
                placeholder="What is your work about?"
                onChange={handleChange}
                required
            />   
            <Form.Input
                className="form-control"
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
            />   
            <Button basic color="blue"
                type="submit"
                className="btn"
            >
                ADD ARTWORK
            </Button>
            </Form>
        </Segment>
        </Grid.Column>
    </Grid>
    </>
    ); 
}