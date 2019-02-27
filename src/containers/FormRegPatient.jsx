import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPatient } from '../actions/formActions';
import '../styles/registerPeople.scss';
import '../styles/refPat.scss';

class FormRegPatient extends Component {
  constructor(props) {
    super(props);
    this.beforeMaskedValueChange = this.beforeMaskedValueChange.bind(this);
    this.onClose = this.onClose.bind(this);
    this.sendForm = this.sendForm.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.state = {
      surname: '',
      name: '',
      middleName: '',
      job: '',
      registration: '',
      file: '',
      email: '',
      bday: '',
      password: '',
      confirmPassword: '',
      telephone: '',
      passwordError: false,
    };
    this.baseState = { ...this.state };
  }

  onClose(e) {
    const { hide } = this.props;
    this.setState(this.baseState);
    hide(e);
  }

  checkPassword() {
    const { password, confirmPassword } = this.state;
    if (!password || password !== confirmPassword) {
      this.setState({ password_has_error: true });
    } else {
      this.setState({ password_has_error: false });
    }
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

  sendForm(e) {
    e.preventDefault();
    const { addPatient } = this.props;
    const data = { ...this.state, id: parseInt(localStorage.userId, 10) };
    addPatient(data);
    this.onClose();
  }

  render() {
    const {
      bday, telephone,
      surname, name,
      middleName, job,
      registration, passwordError,
      file, email, password,
      confirmPassword,
    } = this.state;
    const { show } = this.props;

    return (
      <div className={`registr-popup ${show ? '' : 'hide-popup'}`}>
        <form
          className="registerPeople"
          acton="http://localhost:5000/registration/patient"
          method="POST"
          onSubmit={this.sendForm}
        >
          <CloseIcon className="cross" onClick={this.onClose} />
          <span className="formName">Регистрация Пациента</span>
          <div className="wrap-input">
            <input
              type="text"
              name="surname"
              placeholder="Фамилия"
              onChange={this.handleUserInput}
              value={surname}
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Имя"
              onChange={this.handleUserInput}
              value={name}
              required
            />
          </div>
          <div className="wrap-input">
            <input
              type="text"
              name="middleName"
              placeholder="Отчество"
              onChange={this.handleUserInput}
              value={middleName}
              required
            />
            <InputMask
              name="bday"
              mask="99/99/9999"
              value={bday}
              onChange={this.handleUserInput}
              alwaysShowMask={true}
              beforeMaskedValueChange={this.beforeMaskedValueChange}
            />
          </div>
          <InputMask
            name="telephone"
            mask="+375 (99) 999-99-99"
            value={telephone}
            placeholder="+375 (00) 000-00-00"
            onChange={this.handleUserInput}
            alwaysShowMask={true}
            beforeMaskedValueChange={this.beforeMaskedValueChange}
          />
          <input
            type="text"
            name="job"
            placeholder="Место Работы"
            onChange={this.handleUserInput}
            value={job}
            required
          />
          <div className="wrap-input">
            <input
              type="text"
              name="registration"
              placeholder="Место Регистрации"
              onChange={this.handleUserInput}
              value={registration}
              required
            />
            <input
              type="file"
              name="file"
              data-buttontext="Фото"
              accept=".jpg, .jpeg, .png"
              onChange={this.handleUserInput}
              value={file}
            />
          </div>
          <label>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              onChange={this.handleUserInput}
              value={email}
              required
            />
          </label>
          <div className="wrap-input">
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              onChange={this.handleUserInput}
              value={password}
              required
            />
            <input
              type="password"
              className={passwordError ? 'errorInput' : 'confirmPass'}
              name="confirmPassword"
              placeholder="Подтвердите пароль"
              value={confirmPassword}
              onChange={this.handleUserInput}
              required
            />
          </div>
          <span className={passwordError ? 'appendError' : 'hideError'}>
            Пароли не совпадают
          </span>
          <button type="submit">Подтвердить</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({ form: state.form });
const mapDispatchToProps = dispatch => (
  {
    addPatient: (data) => {
      dispatch(addPatient(data));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(FormRegPatient);

FormRegPatient.propTypes = {
  hide: PropTypes.func.isRequired,
  addPatient: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};
