import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLoginAction } from '../redux/actions';

class Login extends React.Component {
  state = {
    disabled: true,
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.validateData();
  };

  validateData = () => {
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const validateEmail = regex.test(email);
    const minCharacters = 5;

    if (validateEmail && password.length >= minCharacters) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  };

  render() {
    const { disabled, email, password } = this.state;
    const { history, user } = this.props;
    return (
      <fieldset className="login-container">
        <h1 className="login-title">TrybeWallet</h1>
        <label htmlFor="email-input" className="login-label">
          Email:
          <input
            type="text"
            required
            data-testid="email-input"
            placeholder="Digite seu email"
            id="email-input"
            name="email"
            className="login-input"
            value={ email }
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <label htmlFor="password-input" className="login-label">
          Password:
          <input
            type="password"
            required
            data-testid="password-input"
            placeholder="Digite sua senha"
            id="password-input"
            name="password"
            className="login-input"
            value={ password }
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <button
          type="submit"
          disabled={ disabled }
          className="login-btn"
          onClick={ () => {
            user(this.state);
            history.push('/carteira');
          } }
        >
          Entrar
        </button>
      </fieldset>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  user: (state) => dispatch(userLoginAction(state)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  user: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
