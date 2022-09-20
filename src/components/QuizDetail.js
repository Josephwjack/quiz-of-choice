import React from "react";
import PropTypes from "prop-types";

function QuizDetail(props){
  const { quiz, onClickingDelete, onClickingEdit, onSubmittingQuiz } = props;

  function handleNewResponseSubmission(event) {
    event.preventDefault();
    props.onSubmittingQuiz({
      quizId: quiz.id,
      name: quiz.name,
      response1: event.target.response1.value,
      response2: event.target.response2.value,
      response3: event.target.response3.value
    });
  }

  return (
    <React.Fragment>
      <h1>Quiz Detail</h1>
      <h3>{quiz.name}</h3>
      <hr/>
      <form onSubmit={handleNewResponseSubmission}>
        <h5>{quiz.question1}</h5>
        <input type="text" name="response1"/>
        <hr/>
        <h5>{quiz.question2}</h5>
        <input type="text" name="response2"/>
        <hr/>
        <h5>{quiz.question3}</h5>
        <input type="text" name="response3"/>
        <hr/>
        <button type="submit">Submit Quiz</button>
      </form>
      <button onClick={onClickingEdit}>Edit Quiz</button>
      <button onClick={() => onClickingDelete(quiz.id)}>Delete Quiz</button>
    </React.Fragment>
  );
}

QuizDetail.propTypes = {
  quiz: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
  onSubmittingQuiz: PropTypes.func
};

export default QuizDetail;