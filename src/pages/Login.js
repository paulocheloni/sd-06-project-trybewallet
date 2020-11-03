import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* ACTIONS */
import userLogin from '../actions';

class Login extends Component {
  constructor() {
    super();

    this.handleInput = this.handleInput.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      email: '',
      senha: '',
      isValid: false,
    };
  }

  handleInput({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => this.validateInputs());
  }

  validateInputs() {
    const { email, senha } = this.state;
    const regex = /^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/;
    const magicNumber = 6;

    if (senha.length >= magicNumber && regex.test(email)) {
      this.setState({
        isValid: true,
      });
    }
  }

  handleLogin() {
    const { login } = this.props;
    const { email } = this.state;

    login(email);
  }

  render() {
    const { isValid } = this.state;

    return (
      <div>
        <label htmlFor="email">
          E-mail
          <input
            type="text"
            name="email"
            placeholder="Digite seu email"
            data-testid="email-input"
            onChange={ this.handleInput }
          />
        </label>
        <label htmlFor="senha">
          Senha
          <input
            type="password"
            name="senha"
            placeholder="Digite sua senha"
            data-testid="password-input"
            onChange={ this.handleInput }
          />
        </label>
        <button
          disabled={ isValid }
          onClick={ this.handleLogin }
          type="submit"
        >
          <Link to="/carteira">
            Entrar
          </Link>
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(userLogin(email)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
