import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends Component {
  goHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <button
        type="button"
        onClick={ this.goHome }
        data-testid="btn-go-home"
      >
        VOLTAR PARA O INICIO

      </button>
    );
  }
}
Ranking.defaultProps = {
  history: {},
};

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default connect()(Ranking);
