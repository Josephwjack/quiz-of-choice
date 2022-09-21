import React from 'react';
import Header from './Header';
import QuizControl from './QuizControl';
import '../App.css';
import SignIn from "./SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/" element={<QuizControl />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
