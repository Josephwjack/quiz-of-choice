import React from 'react';
import Header from './Header';
import QuizControl from './QuizControl';
import SignIn from "./SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import QuizDashboard from './QuizDashboard';




function App() {
  return (
          
    <Container>
    <React.Fragment>    
      <Router>
        <Header />        
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/dashboard" element={<QuizDashboard />} />
          <Route exact path="/" element={<QuizControl />} />        
        </Routes>
      </Router>
    </React.Fragment>
      </Container>
          
  );
}

{/* <Route 
  path={this.props.match.url + '/deliveries/listDeliveries'}
  name='List Deliveries'
  component={ListDeliveries}
/> */}

export default App;
