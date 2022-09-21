import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
function ReusableForm(props) {
  return (
    <React.Fragment>
      <Container>
      <Form style={{margin: 5, }}onSubmit={props.formSubmissionHandler}>
        <Form.Group>
          <Form.Label>Quiz Name:</Form.Label>
          <Form.Control
            type='text'
            name='name'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Question 1:</Form.Label>
          <Form.Control
            type='text'
            name='question1'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Question 2:</Form.Label>
          <Form.Control
            type='text'
            name='question2'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Question 3:</Form.Label>
          <Form.Control
            type='text'
            name='question3'
          />
        </Form.Group>
        <br />
        <Button className="d-flex justify-content-center" type='submit'>{props.buttonText}</Button>
      </Form>
      </Container>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;