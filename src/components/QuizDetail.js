import React from "react";
import PropTypes from "prop-types";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Input } from 'reactstrap';


function QuizDetail(props){
  const { quiz, onClickingDelete, onClickingEdit } = props;

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
      <Card style={{width: 'auto', justifyContent: 'center', textAlign: 'center'}}>
      
      <Card.Title><h1>{quiz.name}</h1></Card.Title>
      <hr/>
      <Form onSubmit={handleNewResponseSubmission}>
        <Card.Body>
        <h5>{quiz.question1}</h5>
        <Input type="text" name="response1"/>
        <hr/>
        <h5>{quiz.question2}</h5>
        <Input type="text" name="response2"/>
        <hr/>
        <h5>{quiz.question3}</h5>
        <Input type="text" name="response3"/>
        </Card.Body>
        <hr/>
        <Button type="submit">Submit Quiz</Button>
      </Form>
      
    </Card>
    <div className="d-flex justify-content-center">
      <Button variant="danger" onClick={() => onClickingDelete(quiz.id)}>Delete Quiz</Button>
      <Button variant="danger"onClick={onClickingEdit}>Edit Quiz</Button>
      </div>
    </React.Fragment>
  );
}

QuizDetail.propTypes = {
  quiz: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
  
};

export default QuizDetail;