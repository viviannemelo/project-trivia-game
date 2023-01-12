import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions } from '../service/triviaServices';

const RANDOM = 0.5;
const ERROR = 3;
const INDEX = { count: -1 };

class Game extends Component {
  state = {
    questions: [{
      category: '',
      difficulty: '',
      question: '',
      correct_answer: '',
      incorrect_answers: [],
    }],
    randomAnswers: [],
    turn: 0,
    reveal: false,
  };

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const { results, response_code: responseCode } = await fetchQuestions(token);
    if (responseCode === ERROR) {
      localStorage.clear();
      history.push('/');
      return;
    }
    const { correct_answer: correct, incorrect_answers: incorrect } = results[0];

    this.setState({
      questions: results,
      randomAnswers: this.randomize(correct, incorrect),
    });
  }

  componentDidUpdate(_, prevState) {
    const { questions, turn } = this.state;
    const { correct_answer: correct, incorrect_answers: incorrect } = questions[turn];
    if (prevState.turn !== turn) {
      this.setState({
        randomAnswers: this.randomize(correct, incorrect),
      });
    }
  }

  randomize = (correct, incorrect) => {
    const answers = [correct, ...incorrect];
    const randomAnswers = answers.sort(() => Math.random() - RANDOM);
    return randomAnswers;
  };

  handleIndex = () => {
    INDEX.count += 1;
    return INDEX.count;
  };

  handleReveal = (answer) => {
    const { reveal, turn, questions } = this.state;
    const { correct_answer: correct } = questions[turn];
    console.log(correct);
    if (reveal && answer === correct) {
      return 'green';
    } if (reveal) {
      return 'red';
    }
    return '';
  };

  render() {
    const { questions, randomAnswers, turn } = this.state;
    const {
      question,
      category,
      correct_answer: correct,
    } = questions[turn];

    return (
      <section className="App-section">
        <Header />
        <section>
          <h2 data-testid="question-category">{category}</h2>
          <h2 data-testid="question-text">{question}</h2>
        </section>
        <section data-testid="answer-options">
          {randomAnswers.map((answer, index) => (
            <button
              type="button"
              key={ index }
              data-testid={
                answer === correct
                  ? 'correct-answer'
                  : `wrong-answer-${this.handleIndex()}`
              }
              className={ this.handleReveal(answer) }
              onClick={ () => this.setState({ reveal: true }) }
            >
              {answer}
            </button>
          ))}
        </section>
      </section>
    );
  }
}

Game.defaultProps = {
  history: {},
};

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default Game;
