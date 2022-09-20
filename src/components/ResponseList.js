import React from 'react';
import Response from './Response';
import PropTypes from 'prop-types';

function ResponseList(props) {
  return (
    <React.Fragment>
      {/* <h1>{props.quiz.name}</h1>
      <h3>{props.quiz.question1}</h3>
      <h3>{props.quiz.question2}</h3>
      <h3>{props.quiz.question3}</h3> */}
      {props.responses.map((response) =>
        <Response
          response1 = {response.response1}
          response2 = {response.response2}
          response3 = {response.response3}
          key = { response.id}
          id = { response.id } />
      )}
    </React.Fragment>
  );
}

ResponseList.propTypes = {
  responses: PropTypes.array
}

export default ResponseList;