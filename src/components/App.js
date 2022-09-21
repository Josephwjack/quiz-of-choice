import React from 'react';
import Header from './Header';
import QuizControl from './QuizControl';
import SignIn from "./SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';
import QuizDashboard from './QuizDashboard';




function App() {
  return (
    <Container>
    <React.Fragment>    
      <Router>
        <Header />        
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />         
          <Route path="/" element={<QuizControl />} />
          <Route path="/quiz-dash" element={<QuizDashboard />} />
        
        </Routes>
      </Router>
    </React.Fragment>
      </Container>
  );
}

export default App;
