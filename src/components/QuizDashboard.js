import React from 'react';
import { auth } from './../firebase.js';
import PropTypes from 'prop-types';
import Quiz from './Quiz.js';

function QuizDashboard(props) {
  const myDashboard = props.quizList.filter(quiz => auth.currentUser.email === quiz.creator);

  return(
    <React.Fragment>
      {myDashboard.map((quiz) =>
      // <React.Fragment>
        <Quiz
          whenQuizClicked={props.onQuizSelection}
          name={quiz.name}
          onViewResponses={props.onViewResponses}
          id={quiz.id}
          key={quiz.id} />
          
          // </React.Fragment>
      )}
          {/* <button onClick={() => props.onViewResponses(quiz.id)}>View Responses</button> */}
    </React.Fragment>
  );
}

QuizDashboard.propTypes = {
  quizList: PropTypes.array,
  onQuizSelection: PropTypes.func
}

export default QuizDashboard;
