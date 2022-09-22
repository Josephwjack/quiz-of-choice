import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


function Header(){

  
  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand>Quiz of Choice</Navbar.Brand>
          <Nav className="m-2 p-10">                
            <Nav.Link href="/">Home</Nav.Link>                        
            <Nav.Link href="/sign-in">Sign In</Nav.Link>
            <Nav.Link href="/dashboard">My Dashboard</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </React.Fragment>
  );
}

export default Header;