import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchQuestions } from '../service/triviaServices';
import Counter from '../components/Timer';
import { saveScore } from '../redux/actions';

const RANDOM = 0.5;
const ERROR = 3;
const INDEX = { count: -1 };
const MAXTURN = 4;
const POINTS = 10;
const DIFFICULTY = {
  hard: 3,
  medium: 2,
  easy: 1,
};

class Game extends Component {
  state = {
    questions: [
      {
        category: '',
        difficulty: '',
        question: '',
        correct_answer: '',
        incorrect_answers: [],
      },
    ],
    randomAnswers: [],
    turn: 0,
    timer: 0,
    reveal: false,
    isTimeOut: false,
    isNextQuestion: false,
  };

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const { results, response_code: responseCode } = await fetchQuestions(
      token,
    );

    if (responseCode === ERROR) {
      localStorage.removeItem('token');
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

  onTimeOut = () => {
    this.setState({ isTimeOut: true });
  };

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
    const { reveal, turn, questions, isTimeOut } = this.state;
    const { correct_answer: correct } = questions[turn];
    if (reveal && answer === correct) {
      return 'green';
    }
    if (reveal || isTimeOut) {
      return 'red';
    }
    return '';
  };

  handleClick = () => {
    const { turn } = this.state;

    if (turn === MAXTURN) {
      const { history } = this.props;
      history.push('/feedback');
      return;
    }

    this.setState({
      turn: turn + 1,
      reveal: false,
      isNextQuestion: true,
      isTimeOut: false,
    });
  };

  notNextAnymore = () => {
    this.setState({ isNextQuestion: false });
  };

  decodeHtml = (html) => { // to remove the HTML entities like &lt &quot...
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  getTimer = (str) => {
    this.setState({ timer: str - 1 });
  };

  handleClickReveal = (_, answer) => {
    const { dispatch } = this.props;
    const { questions, turn, timer } = this.state;
    this.setState({ reveal: true }, () => {
      const { correct_answer: correct } = questions[turn];
      if (answer === correct) {
        const scorePoints = POINTS + (timer * DIFFICULTY[questions[turn].difficulty]);
        dispatch(saveScore(scorePoints));
      }
    });
  };

  render() {
    const {
      questions,
      randomAnswers,
      turn,
      reveal,
      isTimeOut,
      isNextQuestion,
    } = this.state;
    const { question, category, correct_answer: correct } = questions[turn];

    return (
      <section className="App-section">
        <Header />
        <section>
          <h2 data-testid="question-category">{category}</h2>
          <h2 data-testid="question-text">{this.decodeHtml(question)}</h2>
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
              onClick={ (event) => this.handleClickReveal(event, answer) }
              disabled={ isTimeOut }
            >
              {this.decodeHtml(answer)}
            </button>
          ))}
        </section>
        <Counter
          onTimeOut={ this.onTimeOut }
          isNextQuestion={ isNextQuestion }
          notNextAnymore={ this.notNextAnymore }
          getTimer={ this.getTimer }
        />
        <section>
          {(reveal || isTimeOut) && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.handleClick }
            >
              Próxima
            </button>
          )}
        </section>
      </section>
    );
  }
}

Game.defaultProps = {
  history: {},
};

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default connect()(Game);
