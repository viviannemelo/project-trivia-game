import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends Component {
  state = {
    listGravatar: [],
  };

  componentDidMount() {
    const negative = -1;
    const listGravatar = JSON.parse(localStorage.getItem('listGravatar'));
    listGravatar.sort((a, b) => {
      if (a.score > b.score) return 1;
      if (a.score < b.score) return negative;
      return 0;
    });
    this.setState({ listGravatar });
  }

  goHome = () => {
    const { history } = this.props;
    localStorage.removeItem('token');
    history.push('/');
  };

  render() {
    const { listGravatar } = this.state;
    return (
      <main>
        <section>
          <ol>
            {listGravatar.map((gravatar, index) => (
              <li
                key={ gravatar.token }
              >
                <p data-testid={ `player-name-${index}` }>{gravatar.name}</p>
                <p data-testid={ `player-score-${index}` }>{gravatar.score}</p>
                <img src={ gravatar.gravatarImage } alt={ gravatar.token } />
              </li>))}
          </ol>
        </section>
        <button
          type="button"
          onClick={ this.goHome }
          data-testid="btn-go-home"
        >
          VOLTAR PARA O INICIO
        </button>
      </main>
    );
  }
}
Ranking.defaultProps = {
  history: {},
};

Ranking.propTypes = {
  /* name: PropTypes.string.isRequired,
  gravatarImage: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired, */
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};
const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarImage: state.player.gravatarImage,
});

export default connect(mapStateToProps)(Ranking);
