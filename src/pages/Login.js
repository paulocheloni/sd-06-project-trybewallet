import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions';
// validação de e-mail - site consultado: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };

    this.validation = this.validation.bind(this);
  }

  validation({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { email, password } = this.state;
      const emailExpRegular = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/gi;
      const numberMinimoCaracterSenha = 6;

      if (password.length >= numberMinimoCaracterSenha && emailExpRegular.test(email)) {
        return this.setState({ disabled: false });
      }
      return this.setState({ disabled: true });
    });
  }

  render() {
    const { email, password, disabled } = this.state;
    const { formLogin } = this.props;

    return (
      <div>
        <form>
          <label
            htmlFor="email"
          >
            Email
            <input
              data-testid="email-input"
              id="email"
              name="email"
              type="text"
              value={ email }
              placeholder="exemplo@gmail.com"
              required
              onChange={ this.validation }
            />
          </label>
          <br />
          <label
            htmlFor="password"
          >
            Senha
            <input
              data-testid="password-input"
              id="password"
              name="password"
              type="text"
              minLength="6"
              value={ password }
              required
              onChange={ this.validation }
            />
          </label>
          <br />
          <Link to="/carteira">
            <button
              disabled={ disabled }
              type="submit"
              onClick={ () => formLogin(this.state) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  formLogin: (data) => dispatch(login(data)),
});

Login.propTypes = {
  formLogin: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(Login);
