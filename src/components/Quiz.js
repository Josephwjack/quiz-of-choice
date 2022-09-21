import React from 'react';
import PropTypes from 'prop-types';

function Quiz(props){
  return (
    <React.Fragment>
      <div onClick = {() => props.whenQuizClicked(props.id)}>
        <h3>{props.name}</h3>
        <button onClick={() => props.onViewResponses(props.id)}>View Responses</button>
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