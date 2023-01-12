import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  goRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    // console.log(this.props.score);
    return (
      <section className="App-section">
        <h2>Feedback</h2>
        <button
          type="button"
          onClick={ this.goRanking }
          data-testid="btn-ranking"
        >
          Ranking

        </button>
      </section>

    );
  }
}
Feedback.defaultProps = {
  history: {},
};

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarImage: state.player.gravatarImage,
});

export default connect(mapStateToProps)(Feedback);
