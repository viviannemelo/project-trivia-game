import React, { Component } from 'react';

class Feedback extends Component {
  render() {
    return (
      <section className="App-section">
        <h2>Feedback</h2>
        <section>
          <p data-testid="feedback-text">text</p>
        </section>
      </section>
    );
  }
}

export default Feedback;
