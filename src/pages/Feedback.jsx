import React, { Component } from 'react';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    console.log(this.props.score);
    return (
      <section className="App-section">
        <h2>Feedback</h2>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarImage: state.player.gravatarImage,
});

export default connect(mapStateToProps)(Feedback);
