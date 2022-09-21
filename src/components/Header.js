import React from "react";
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
            <Link to="/">Home</Link>                        
          </Nav>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/quiz-dash">My Dashboard</Link>
        </Container>
      </Navbar>
    </React.Fragment>
  );
}

export default Header;