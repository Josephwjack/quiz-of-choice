import React, { useState } from "react";
import { auth } from "./../firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SignIn(){ 
  const [signUpSuccess, setSignUpSuccess] = useState(null);
  const [signInSuccess, setSignInSuccess] = useState(null);
  const [signOutSuccess, setSignOutSuccess] = useState(null);

  const doSignUp = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignUpSuccess(`You've successfully signed up, ${userCredential.user.email}!`) 
      })
      .catch((error) => {
        setSignUpSuccess(`There was an error signing up: ${error.message}!`)
      });
  }

  const doSignIn = (event) => {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignInSuccess(`You've successfully signed in as ${userCredential.user.email}!`)
      })
      .catch((error) => {
        setSignInSuccess(`There was an error signing in: ${error.message}!`)
      });
  }

  function doSignOut() {
    signOut(auth)
      .then(function() {
        setSignOutSuccess("You have successfully signed out!");
      }).catch(function(error) {
        setSignOutSuccess(`There was an error signing out: ${error.message}!`);
      })
  }
 
  return (
    <React.Fragment>
      <div>
      <Form onSubmit={doSignUp}>
      <h1>Sign up</h1>
      {signUpSuccess}
      <Form.Group className="mb-3 justify-content-center" controlId="email">
      {/* <form onSubmit={doSignUp}> */}
        {/* <input */}
          <Form.Control type='email'
          name='email'
          placeholder='email' />
      </Form.Group>
      <Form.Group className="mb-3 justify-content-center" controlId="password">
          <Form.Control type='password'
          name='password'
          placeholder='password' />
          </Form.Group>
        <Button type='submit'>Sign up</Button>
      </Form>
      <Form  onSubmit={doSignIn}>
      <h1>Sign In</h1>
      {signInSuccess}
      <Form.Group className="mb-3" controlId="signinEmail">
        <Form.Control
          type='signinEmail'
          name='signinEmail'
          placeholder='email' />
      </Form.Group>
      <Form.Group className="mb-3" controlId="signinPassword">
        <Form.Control
          type='password'
          name='signinPassword'
          placeholder='password' />
      </Form.Group>
        <Button type='submit'>Sign in</Button>
        </Form>
      </div>
      <div>
      <h1>Sign Out</h1>
      {signOutSuccess}
      <br />
      </div>
      <Button onClick={doSignOut}>Sign out</Button>
    </React.Fragment>
      
  );
}

export default SignIn;