import React, { Component } from 'react';

class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, email } = this.state;

    return (
      <form>
        <input
          type="text"
          placeholder="Username"
          data-testid="input-player-name"
          name="name"
          value={ name }
          onChange={ this.handleChange }
        />
        <input
          type="text"
          placeholder="E-mail"
          name="email"
          value={ email }
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !email.match(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm) }
        >
          Play
        </button>
      </form>
    );
  }
}

export default Login;
