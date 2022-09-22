import React from 'react';
import { auth } from './../firebase.js';
import PropTypes from 'prop-types';
import Quiz from './Quiz.js';


function QuizDashboard(props) {
  if (auth.currentUser == null) {
    return (
      <h2>You must be signed in to view the quiz dashboard</h2>
    )
  } else {
  const myDashboard = props.quizList.filter(quiz => auth.currentUser.email === quiz.creator);

  return(
    <React.Fragment>
      {myDashboard.map((quiz) =>
      
        <Quiz
          whenQuizClicked={props.onQuizSelection}
          name={quiz.name}
          onViewResponses={props.onViewResponses}
          id={quiz.id}
          key={quiz.id} />        
      )}
    </React.Fragment>
  );
}
}

QuizDashboard.propTypes = {
  quizList: PropTypes.array,
  onQuizSelection: PropTypes.func
}

export default QuizDashboard;
