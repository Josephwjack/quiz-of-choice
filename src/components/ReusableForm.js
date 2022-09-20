import React from 'react';
import PropTypes from 'prop-types';

function ReusableForm(props) {
  return (
    <React.Fragment>
      <form onSubmit={props.formSubmissionHandler}>
        <input
          type='text'
          name='name'
          placeholder='Quiz name' />
        <input
          type='text'
          name='question1'
          placeholder='question 1' />
        <input
          type='text'
          name='question2'
          placeholder='question 2' />
        <input
          type='text'
          name='question3'
          placeholder='question 3' />
        <button type='submit'>{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;