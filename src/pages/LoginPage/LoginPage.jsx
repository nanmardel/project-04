import React, { useState } from "react";
import "./LoginPage.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import { useNavigate, Link } from "react-router-dom"
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'


export default function LoginPage(props) {
  const [error, setError] = useState('');
  const [state, setState] = useState({
    email:'',
    password:'',
  });

  const navigate =useNavigate();

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await userService.login(state);
      // route to wherever  you want
      props.handleSignUpOrLogin();
      navigate('/');
    } catch (err) {
      setError(err.message);  // invalid user data (probably duplicate email)
    }
  }













  return (
    <>
    <Grid
      textAlign="center"
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 390 }}>
        <Header as="h1" color="blue" textAlign="center">
          STUDIO
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
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
            <Button
              basic color="blue"
              fluid
              size="large"
              type="submit"
              className="btn"
            >
              Log In
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Link to="/signup">Sign Up</Link>
        </Message>
        {error ? <ErrorMessage error={error} /> : null}
      </Grid.Column>
    </Grid>
  </>
  );  
}
