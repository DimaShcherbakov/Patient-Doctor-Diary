import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import validateEmail from '../utils/validateEmail';
import Error from '../components/error.jsx';
import { checkData } from '../actions/loginActions';
import '../styles/form.scss';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.state = {
      email: '',
      password: '',
      option: '',
      formErrors: {
        email: 'Неверная почта',
        unRegistered: 'Проверьте логин и пароль',
      },
      emailValid: false,
    };
  }

  handleUserInput(e) {
    const { email } = this.state;
    const { password } = this.state;
    const { name } = e.target;
    const { value } = e.target;
    this.setState({ [name]: value });
    if (email !== '' && password === '') {
      this.setState({ emailValid: false });
      if (validateEmail(value)) {
        this.setState({ emailValid: true });
      }
    }
  }

  sendRequest(e) {
    e.preventDefault(e);
    const { email, password, option } = this.state;
    const { checkData } = this.props;
    if (email !== '' && password !== '' && option !== '') {
      checkData({ email, password, status: option });
    } else {
      this.setState({
        emailValid: true,
      });
    }
  }

  render() {
    const { emailValid, formErrors, email, password  } = this.state;
    console.log(this.state.option)
    const { isAuthorised } = this.props.enter;
    if (isAuthorised) {
      return (
        <Redirect to="/main" />
      );
    }
    return (
      <div className="form">
        <h1>Enter</h1>
        {emailValid ? <Error content={formErrors.unRegistered} /> : '' }
        <label htmlFor="email">Enter your @mail</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="abcdej@mail.ru"
          value={email}
          required
          onChange={this.handleUserInput}
        />
        <label htmlFor="password">Enter your password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="jhvdofuqwy3"
          value={password}
          required
          onChange={this.handleUserInput}
        />
        <div className="select">
          <select
            name="option"
            onChange={this.handleUserInput}
          >
            <option value="error">Choose status</option>
            <option value="doctor">Доктор</option>
            <option value="patient">Пациент</option>
          </select>
        </div>
        <Button
          variant="contained"
          color="primary"
          className="btn"
          onClick={this.sendRequest}
        >
          Enter
        </Button>
        <p className="links">
          <Link to="/password">Забыли пароль?</Link>
          <span> | </span>
          <Link to="/register">Регистрация</Link>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({ enter: state.login });

const mapDispatchToProps = dispatch => (
  {
    checkData: (data) => {
      dispatch(checkData(data));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  enter: PropTypes.object.isRequired,
  checkData: PropTypes.func.isRequired,
};
