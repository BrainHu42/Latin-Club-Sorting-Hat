import React, { Component } from 'react';

import Quiz from './components/Quiz';
import Questions from './api/Questions'
import Result from './components/Result'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      imgSrc: '',
      imgAlt: '',
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {
        Jupiter: 0,
        Juno: 0,
        Pluto: 0,
        Neptune: 0,
        Mars: 0,
        Mercury: 0,
        Venus: 0,
        Apollo: 0,
        Diana: 0,
        Minerva: 0,
        Ceres: 0,
        Vulcan: 0
      },
      result: ''
    };
  }

  handleClick = () => {
    document.querySelectorAll(".hide").forEach( e => e.classList.remove("hide"));
    document.querySelectorAll(".hide-toggle").forEach( e => e.classList.add("hide"));
  }

  componentWillMount = () => {
    const shuffledAnswerOptions = Questions.map((question) => this.shuffleArray(question.answers)); // Setting new random order of possible answer array by calling suffle function

    this.setState({
      imgSrc: Questions[0].imgSrc,
      imgAlt: Questions[0].imgAlt,
      question: Questions[0].question, // Setting first question -- Displaying first question from Question data array
      answerOptions: shuffledAnswerOptions[0] // Setting first answers -- Displaying first question's posisble answers randomly from Question data array 
    });
  }

  shuffleArray = (array) => { // Shuffle function being called
    let currentIndex = array.length, temporaryValue, randomIndex; // Setting current index from answer option length (4) and other variables

    while (0 !== currentIndex) { // Will continue so long as there are still items in the array. (First index of 4 then --)
      randomIndex = Math.floor(Math.random() * currentIndex); // Set random new index (ex. 2)
      currentIndex -= 1; // Current index now 3
      temporaryValue = array[currentIndex]; // Value set to array[3] or third answer option
      array[currentIndex] = array[randomIndex]; // array[3] = array[2]
      array[randomIndex] = temporaryValue; // array[2] = array [3] :: This is essentially swapping to answer option positions using third variable
    } // Process continues for each index (4 times)

    return array; // return new random array
  }

  setUserAnswer = (answer) => { // for each selected answer new state to be added
    this.setState((state) => ({
      answersCount: { // setting new state of answersCount object containing key (house) and values (current score)
        ...state.answersCount, // utilizing previus state
        [answer]: state.answersCount[answer] + 1 // taking the key that matches the selected answer and adding 1 to its value
      },
      answer: answer // answer previously empty string now the selected answer
    }));
  }

  setNextQuestion = () => {
    const counter = this.state.counter + 1; // Counter starts at zero and increments by one each question (counter = 0)
    const questionId = this.state.questionId + 1; // Start at 1 (Question 1) and increments by one (id =1)
    this.setState({
      counter: counter, // return new counter (counter = 1)
      imgSrc: Questions[counter].imgSrc,
      imgAlt: Questions[counter].imgAlt,
      questionId: questionId, // return new id (id = 2)
      question: Questions[counter].question, // replace last question with next one from Question data array (question = Questions[1].question)
      answerOptions: Questions[counter].answers, // replace last answer options with next one from Question data array
      answer: '' // resetting selected answer
    });
  }

  handleAnswerSelected = (e) => { // called when answer is selected
    this.setUserAnswer(e.currentTarget.value); // calling setUserAnswer function with selected answer
    if (this.state.questionId < Questions.length) { // continue for all items in Question Array
        setTimeout(() => this.setNextQuestion(), 500); // calling setNextQUestion function after given time
      } else { // return once all questions answered
        setTimeout(() => this.setResults(this.getResults()), 500); // calling setResults function after given time using the results from the called getResults function
      }
  }

  getResults = () => { // to determine result
    const answersCount = this.state.answersCount; // setting answer object of current state (exObj= {H: 5, G: 1, R: 1, S: 1})
    const answersCountKeys = Object.keys(answersCount); // setting key array from answer object (exArr= [H, G, R, S])
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]); // iterate over key array and set value array to be the answer object value at that key index (exVals = [5, 1, 1, 1])
    const maxAnswerCount = Math.max(...answersCountValues); // spread operator to get max number from array (ex. 5)

    console.log(answersCountKeys);
    console.log(answersCountValues);
    return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount); // returns answer object item who has max (exResult. [H] : exObg[H] = 5)
  }

  setResults = (result) => { // takes in calculated result array (ex. [H])
    console.log(result);
    const rindex = Math.floor(Math.random() * result.length);
    console.log(rindex);
    if (result.length === 1) { // if only one max value in array 
      this.setState({ result: result[0] }); // returns only item (ex. H)
    } else { // if more than one max value like a tie (ex. [H, G, S])
      this.setState({ result: result[rindex]}); // returns result at random index (ex. length=3 => random index expected 0, 1, or 2)
    }
  }

  renderQuiz = () => {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={Questions.length}
        imgSrc={this.state.imgSrc}
        imgAlt={this.state.imgAlt}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult = () => {
    return (
      <Result quizResult={this.state.result} />
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img className="App-logo" src={require("./designFiles/latin-club-logo.png")} alt="Latin Club Logo" />
          <div>
            <h1>Welcome to Mount Olympus</h1>
            <h2>Home of the Olympians</h2>
          </div>
          <img className="App-logo" src={require("./designFiles/latin-club-logo.png")} alt="Latin Club Logo" />
        </header>

        <div className="hide-toggle App-section">
          <img src={require("./designFiles/olympus.jpeg")} className="App-homescreen" alt="Mount Olympus" />
          <p>
              Welcome to Mount Olympus, home of Olympians. Each of the 12 Olympians represented a unique aspect of Roman culture which was expressed through their differing character traits.
              Are you mighty like Jupiter? Wise like Minerva? Fierce like Mars? Or crafty like Vulcan? Take this quiz to find out.
          </p>
          <div className="App-btn" onClick={this.handleClick}>Incipe!</div>
        </div>

        <div className="hide">
          {this.state.result ? this.renderResult() : this.renderQuiz()}
        </div>

      </div>
    );
  }
}

export default App;
