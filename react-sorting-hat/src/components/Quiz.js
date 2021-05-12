import React from 'react';
import Answer from '../components/Answer';

const Quiz = (props) => {
    const renderAnswerOptions = (key) => {
        return (
          <Answer
            key={key.content}
            answerContent={key.content}
            answerType={key.type}
            answer={props.answer}
            questionId={props.questionId}
            onAnswerSelected={props.onAnswerSelected}
          />
        );
    }

    return (
        <div className="quiz">
            <header className="App-header Question-header">
                <h2>Question <span>{props.questionId}</span> of <span>{props.questionTotal}</span></h2>
            </header>
            <div className="App-section">
                <img className="App-gif" src={props.imgSrc} alt={props.imgAlt}/>
                <p>{props.question}</p>
                <ul className="answerOptions">
                    {props.answerOptions.map(renderAnswerOptions)}
                </ul>
            </div>
        </div>
    );
  }

export default Quiz;