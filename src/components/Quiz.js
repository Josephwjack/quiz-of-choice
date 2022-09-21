import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

function Quiz(props){
  return (
    <React.Fragment>
      <div onClick = {() => props.whenQuizClicked(props.id)}>
        <h3>{props.name}</h3>
        <Button onClick={() => props.onViewResponses(props.id)}>View Responses</Button>
      </div>
    </React.Fragment>
  );
}

Quiz.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  whenQuizClicked: PropTypes.func,
  onViewResponses: PropTypes.func
}

export default Quiz;