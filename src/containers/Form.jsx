import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import validateEmail from '../utils/validateEmail';
import { Button } from '@material-ui/core';
// import Error from '../components/error';
import checkData from '../actions/loginReducer';
import '../styles/form.scss';

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.state = {
      email: '',
      password: '',
      formErrors: {
        email: 'Неверная почта',
        unRegistered: 'Проверьте логин и пароль',
      },
      emailValid: true,
    };
  }

  handleUserInput(e) {
    const { email } = this.state;
    const { password } = this.state;
    const { name } = e.target;
    const { value } = e.target;// e.target.value
    this.setState({ [name]: value });
    if (email !== '' && password === '') {
      this.setState({ emailValid: false });
      if (validateEmail(value)) {
        this.setState({ emailValid: true });
      }
    }
  }

  render() {
    const { emailValid } = this.state;
    const { formErrors } = this.state;
    const { email } = this.state;
    const { password } = this.state;
    const { isAuthorised } = this.props.enter;
    if (isAuthorised) {
      return (
        <Redirect to="/main" />
      );
    }
    return (
      <div className="form">
        <h1>Enter</h1>
        <label htmlFor="email">Enter your @mail</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="abcdej@mail.ru"
          value={email}
          onChange={this.handleUserInput}
        />
        {/* {emailValid ? '' : <Error content={formErrors.email} />} */}
        <label htmlFor="password">Enter your password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="jhvdofuqwy3"
          value={password}
          onChange={this.handleUserInput}
        />
        <Button
          variant="contained"
          color="primary"
          className="btn"
          onClick={() => { (email !== '' && password !== '') ? this.props.checkData({ email, password}) : console.log('Некорректные данные')} }
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

const mapStateToProps = (state) => {
  return {
    enter: state.login,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    checkData: (data) => {
      dispatch(checkData(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
