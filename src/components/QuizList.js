import React from 'react';
import Quiz from './Quiz';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';

function QuizList(props) {
  return (
    <React.Fragment>
      <hr />
     
      {props.quizList.map((quiz) => 
      
          <Quiz
            whenQuizClicked = { props.onQuizSelection }
            name = { quiz.name } 
            onViewResponses = {props.onViewResponses}
            id = { quiz.id}
            key = { quiz.id}
            />                
      )}     
     
       <hr />    
    </React.Fragment>
  );
}

QuizList.propTypes = {
  quizList: PropTypes.array,
  onViewResponses: PropTypes.func,
  onQuizSelection: PropTypes.func
}

export default QuizList;
