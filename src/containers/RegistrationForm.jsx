import React from 'react';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import { addDoctor } from '../actions/formActions';
import { connect } from 'react-redux';
import Error from '../components/error.jsx';
import '../styles/register.scss';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.formHandler = this.formHandler.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.beforeMaskedValueChange = this.beforeMaskedValueChange.bind(this);
    this.state = {
      firstName: '',
      secondName: '',
      thirdName: '',
      brthDay: '',
      position: '',
      telephone: '',
      email: '',
      image: '',
      pas1: '',
      pas2: '',
      formErrors: {
        pasError: 'Пароли не совпадают',
        emailError: 'Пользователь уже существует',
      },
      wrongPassword: false,
    };
  }

  handleUserInput(e) {
    const { name } = e.target;
    const { value } = e.target;
    this.setState({ [name]: value });
  }

  beforeMaskedValueChange(newState, oldState, userInput) {
    let { value, selection } = newState;
    const { brthDay } = this.state;
    let cursorPosition = selection ? selection.start : null;
    if (value.endsWith('-') && userInput !== '-' && !brthDay.endsWith('-')) {
      if (cursorPosition === value.length) {
        cursorPosition -= 1;
        selection = { start: cursorPosition, end: cursorPosition };
      }
      value = value.slice(0, -1);
    }
    return { value, selection };
  }

  formHandler(e) {
    e.preventDefault();
    const { addDoctor } = this.props;
    const { pas1, pas2 } = this.state;
    if (pas1 === pas2) {
      addDoctor(this.state);
    } else {
      this.setState({
        wrongPassword: true,
      })
    }
  }

  render() {
    const {
      firstName,
      formErrors,
      secondName,
      thirdName,
      brthDay,
      position,
      telephone,
      email,
      pas1,
      image,
      pas2,
      wrongPassword,
    } = this.state;
    const { success, wrongEmail } = this.props.form;
    console.log(success)
    if (success) {
      return <Redirect to="/" />;
    }
    return (
      <div className="wrap-reg">
        <form
          className="reg-form"
          action="http://localhost:5000/register"
          method="POST"
          onSubmit={this.formHandler}
        >
          <h2>Регистрация</h2>
          <div className="main-info">
            <label className="avatar" htmlFor="avatar">
              <div className="plus">
                <input
                  type="file"
                  name="file"
                  id="avatar"
                  accept=".jpg, .jpeg, .png"
                  onChange={this.handleUserInput}
                />
              </div>
            </label>
            <div className="person-data">
              <label htmlFor="secondName">Фамилия</label>
              <input
                type="text"
                name="secondName"
                id="secondName"
                value={secondName}
                onChange={this.handleUserInput}
                required
              />
              <label htmlFor="firstName">Имя</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                onChange={this.handleUserInput}
                required
              />
              <label htmlFor="">Отчество</label>
              <input
                type="text"
                name="thirdName"
                value={thirdName}
                onChange={this.handleUserInput}
                required
              />
            </div>
          </div>
          <label htmlFor="">Дата рождения</label>
          <InputMask
            name="brthDay"
            mask="99/99/9999"
            value={brthDay}
            onChange={this.handleUserInput}
            alwaysShowMask={true}
            beforeMaskedValueChange={this.beforeMaskedValueChange}
          />
          <label htmlFor="">Должность</label>
          <input
            type="text"
            name="position"
            value={position}
            onChange={this.handleUserInput}
            required
          />
          <div className="contact-wrap">
            <div>
              <label htmlFor="">Телефон</label>
              <br />
              <InputMask
                name="telephone"
                mask="+375 (99) 999-99-99"
                value={telephone}
                placeholder="+375 (00) 000-00-00"
                onChange={this.handleUserInput}
                alwaysShowMask={true}
                beforeMaskedValueChange={this.beforeMaskedValueChange}
              />
            </div>
            <div>
              <label htmlFor="">Email</label>
              <br />
              <input
                type="email"
                name="email"
                value={email}
                onChange={this.handleUserInput}
                required
              />
              <Error hide={wrongEmail} content={formErrors.emailError} />
            </div>
          </div>
          <div className="pas-wrap">
            <div>
              <label htmlFor="">Пароль</label>
              <br />
              <input
                type="password"
                name="pas1"
                value={pas1}
                onChange={this.handleUserInput}
                required
              />
            </div>
            <div>
              <label htmlFor="">Повторите пароль</label>
              <br />
              <input
                type="password"
                name="pas2"
                value={pas2}
                onChange={this.handleUserInput}
                required
              />
            </div>
          </div>
          <Error hide={wrongPassword} content={formErrors.pasError} />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="btn"
          >
            Зарегистрироваться
          </Button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ form: state.form });

const mapDispatchToProps = (dispatch) => (
  {
    addDoctor: (data) => {
      dispatch(addDoctor(data))
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
