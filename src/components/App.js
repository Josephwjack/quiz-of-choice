import React from 'react';
import Header from './Header';
import QuizControl from './QuizControl';
import '../App.css';

import SignIn from "./SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container fluid>
    <React.Fragment>
      <Router>
        <Header />        
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/" element={<QuizControl />} />
        </Routes>
      </Router>
    </React.Fragment>
      </Container>
  );
}

export default App;
