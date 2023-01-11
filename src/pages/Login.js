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

  validateButon = () => {
    const { email, name } = this.state;
    const minCharactersPassWord = 1;
    const verifyEmail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/.test(email);
    const verifyName = name.length >= minCharactersPassWord;
    return verifyEmail && verifyName;
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
          disabled={ !this.validateButon() }
        >
          Play
        </button>
      </form>
    );
  }
}

export default Login;
