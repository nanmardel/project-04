import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'
import userService from "../../utils/userService";
import { useNavigate } from "react-router-dom";


// pieces of state to keep track of what we want in our form.
export default function SignUpPage(props) {

  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [state, setState] = useState({
    username: '',
    email:'',
    password: '',
    passwordConf: '',
    bio: ''
  })

  const [selectedFile, setSelectedFile] = useState('');

  //create formData because we are sending multipart/formData request,
  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData();
    formData.append('photo', selectedFile);
    for (let fieldName in state) {
      formData.append(fieldName, state[fieldName])
    }
     console.log(formData, " <- formData") // <- this doesn't allow you to look at the formdData object
    console.log(formData.forEach((item) => console.log(item))); // <- to look at the keys, you must forEach over it

    try {
      await userService.signup(formData) // pass the argument as formData when we have a photo
      props.handleSignUpOrLogin();
      navigate('/')
    }catch(err) {
      console.log(err.message);
      setError(err.message)
    }
  }
  function handleChange(e) {
    setState({
    ...state,
    [e.target.name]: e.target.value
    })
  }

  function handleFieldInput(e) {
    console.log(e.target.files);
    setSelectedFile(e.target.files[0]);
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" color="blue" textAlign="center">
          <Image src="https://i.imgur.com/AiET68K.jpg" /> Studio
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              placeholder="username"
              value={state.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <Form.TextArea
              label="Bio"
              name="bio"
              placeholder="Tell us about your work"
              onChange={handleChange}
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFieldInput}
                
              />
            </Form.Field>
            <Button  basic color='blue' type="submit" className="btn">
              Signup
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  );
}  
