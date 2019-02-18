import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import validateEmail from '../utils/validateEmail';
import { Button } from '@material-ui/core';
import Error from '../components/error.jsx';
import { enterState } from '../actions/reducerActions';
import '../styles/form.scss';

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.userEnter = this.userEnter.bind(this);
    this.state = {
      email: '',
      password: '',
      formErrors: {
        email: 'Неверная почта',
        password: 'Неверный пароль',
        unRegistered: 'Проверьте логин и пароль',
      },
      emailValid: true,
      authorised: false,
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

  userEnter(e) {
    e.preventDefault();
    const { email } = this.state;
    const { password } = this.state;
    if (email !== '' && password !== '') {
      axios.post('http://localhost:5000/login/', {
        email: email,
        password: password,
      })
        .then((res) => {
          console.log(res.data.token);
          localStorage.token = res.data.token;
          this.setState({
            email: '',
            password: '',
            authorised: true,
          });
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    const { emailValid } = this.state;
    const { formErrors } = this.state;
    const { authorised } = this.state;
    const { email } = this.state;
    const { password } = this.state;
    if (authorised) {
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
        {emailValid ? '' : <Error content={formErrors.email} />}
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
          onClick={this.userEnter}
        >
          Enter
        </Button>
        <p className="links">
          {console.log(this.props.enter.enterUser)}
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
    enter: state.enter,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    enterState: (show) => {
      dispatch(enterState(show));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
