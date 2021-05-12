import React from 'react';
import Results from '../api/Results'

const Result = (props) => {

    console.log(props.quizResult);

    let result = props.quizResult;

    return (
        <div className={`result ${props.quizResult}`}>
            <header className="App-header Result-header">
                <div>
                    <h1> -- {props.quizResult} -- </h1>
                </div>
            </header>
            <div className="App-section">
                <img className="App-result" src={Results[result].imgSrc} alt={Results[result].imgAlt}/>
                <p style={{fontsize: "2.0rem"}}>
                    {Results[result].motto}
                    <br></br>
                    {/* <span className="sm-qt">- Harry Potter and the Philosopher's Stone: (Ch. 7) The Sorting Hat -- J.K. Rowling -</span> */}
                </p>
                <div className="result-btns">
                    <a href={Results[result].website} target="_blank"><div className="App-btn result-btn">Learn More</div></a>
                    <a href="index.html"><div className="App-btn result-btn">Start Over</div></a>
                </div>
            </div>
        </div>
    );
}

export default Result;