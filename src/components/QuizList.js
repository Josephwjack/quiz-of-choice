import React from 'react';
import Quiz from './Quiz';
import PropTypes from 'prop-types';


const listStyles = {
  marginTop: "5%",
  textAlign: "center",
}

function QuizList(props) {
  return (
    <React.Fragment>
      <div style={listStyles}>
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
      </div>   
    </React.Fragment>
  );
}

QuizList.propTypes = {
  quizList: PropTypes.array,
  onViewResponses: PropTypes.func,
  onQuizSelection: PropTypes.func
}

export default QuizList;
