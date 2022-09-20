import React from 'react';
import Quiz from './Quiz';
import PropTypes from 'prop-types';

function QuizList(props) {
  return (
    <React.Fragment>
      <hr />
      {props.quizList.map((quiz) => 
        <React.Fragment>
          <Quiz
            whenQuizClicked = { props.onQuizSelection }
            name = { quiz.name } 
            key = { quiz.id }
            id = { quiz.id } />
          <button onClick={() => props.onViewResponses(quiz.id)}>View Responses</button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

QuizList.propTypes = {
  quizList: PropTypes.array,
  onQuizSelection: PropTypes.func
}

export default QuizList;
