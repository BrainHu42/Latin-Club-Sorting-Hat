import React from 'react';

const Answer =(props) => {
  return (
    <li className="answerOption">
      <input
        type="radio"
        className="radioCustomButton"
        checked={props.answerType === props.answer}
        id={props.answerType}
        value={props.answerType}
        disabled={props.answer}
        onChange={props.onAnswerSelected}
      />
      <label className="radioCustomLabel" htmlFor={props.answerType}>
        {props.answerContent}
      </label>
    </li>
  );
}

export default Answer;