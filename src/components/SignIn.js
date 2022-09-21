import React, { useState } from "react";
import { auth } from "./../firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SignIn(){ 
  const [signUpSuccess, setSignUpSuccess] = useState(null);
  const [signInSuccess, setSignInSuccess] = useState(null);
  const [signOutSuccess, setSignOutSuccess] = useState(null);

  function doSignUp(event) {
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

  function doSignIn(event) {
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
      <Form>
      <h1>Sign up</h1>
      {signUpSuccess}
      <Form.Group className="mb-3 justifiy-content-center" onSubmit={doSignUp}>
      {/* <form onSubmit={doSignUp}> */}
        {/* <input */}
          <Form.Control type='text'
          name='email'
          placeholder='email' />
      
          <Form.Control type='password'
          name='password'
          placeholder='Password' />
          </Form.Group>
        <Button type='submit'>Sign up</Button>
      </Form>
      <Form>
      <h1>Sign In</h1>
      {signInSuccess}
      <Form.Group className="mb-3" onSubmit={doSignIn}>
        <Form.Control
          type='text'
          name='signinEmail'
          placeholder='email' />
        <Form.Control
          type='password'
          name='signinPassword'
          placeholder='Password' />
      </Form.Group>
        <Button type='submit'>Sign in</Button>
        </Form>

      <h1>Sign Out</h1>
      {signOutSuccess}
      <br />
      <Button onClick={doSignOut}>Sign out</Button>
      </div>
    </React.Fragment>
      
  );
}

export default SignIn;