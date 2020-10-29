import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { emailSaveToState } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  changeHandler({ target: { name, value } }) {
    this.updateState(name, value);
  }

  updateState(name, value) {
    this.setState(() => ({
      [name]: value,
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event);
    const { email, password } = this.state;

    const emailValidation = this.validateEmail(email);
    const passwordValidation = this.validatePassword(password);

    if (emailValidation && passwordValidation) {
      emailSaveToState(email);
      this.updateState('isOk', true);
    }
  }

  //  https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
  validateEmail(email) {
    const isValid = email.match(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i);
    return isValid ? email : 0;
  }

  validatePassword(password) {
    const PW_MIN_LENGTH = 6;
    const isValid = password.length >= PW_MIN_LENGTH;
    return isValid ? password : 0;
  }

  render() {
    const { email, password, isOk } = this.state;
    if (isOk === true) return (<Link to="/carteira" />);
    return (
      <div>
        <form>
          <fieldset style={ { width: '200px' } }>
            <legend style={ { textAlign: 'center' } }>Login</legend>
            <div className="login_input" style={ { textAlign: 'center' } }>
              <input
                style={ { textAlign: 'center' } }
                placeholder="E-MAIL"
                data-testid="email-input"
                type="email"
                name="email"
                maxLength="50"
                required
                value={ email }
                onChange={ this.changeHandler }
              />
              <input
                style={ { textAlign: 'center' } }
                placeholder="SENHA"
                data-testid="password-input"
                type="password"
                name="password"
                minLength="6"
                maxLength="50"
                required
                value={ password }
                onChange={ this.changeHandler }
              />
              <button
                type="submit"
                onClick={ this.handleSubmit }
              >
                Entrar
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  email: (e) => dispatch(emailSaveToState(e)),
});

// const mapStateToProps = (state) => ({
// email: state.user,
// });

// Login.propTypes = {
//   emailSaveToState: PropTypes.func.isRequired,
// };

export default connect(null, mapDispatchToProps)(Login);
