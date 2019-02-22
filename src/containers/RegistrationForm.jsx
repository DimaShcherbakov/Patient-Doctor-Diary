import React from 'react';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
// import { telMask, dateMask } from '../utils/Masks';
// import Error from './error.jsx';
import '../styles/register.scss';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.formHandler = this.formHandler.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.checkPas = this.checkPas.bind(this);
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
        emailError: 'Проверьте email',
      },
      formErr: false,
    };
  }

  checkPas() {
    const { pas1 } = this.state;
    const { pas2 } = this.state;
    if (pas1 === pas2) {
      this.setState({ truePas: true });
    } else {
      console.log('Wrong password');
    }
  }

  handleUserInput(e) {
    const { name } = e.target;
    const { value } = e.target;
    this.setState({ [name]: value });
  }

  formHandler(e) {
    e.preventDefault();
    this.checkPas();
    const {
      firstName,
      secondName,
      thirdName,
      brthDay,
      position,
      telephone,
      email,
      pas1,
      image,
      pas2,
    } = this.state;
    if (pas1 === pas2) {
      axios
        .post('http://localhost:5000/register', {
          firstName,
          secondName,
          thirdName,
          brthDay,
          position,
          telephone,
          email,
          pas: pas1,
          photo: image,
        })
        .then(res => {
          if (res.message) {
            console.log('User is already existed');
          } else {
            console.log('user was added');
          }
        });
    }
  }

  componentDidMount() {
    telMask('tel');
    dateMask('date');
  }

  render() {
    const {
      firstName,
      secondName,
      thirdName,
      brthDay,
      position,
      telephone,
      email,
      pas1,
      image,
      pas2,
    } = this.state;
    const { truePas } = this.state;
    if (truePas) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <form>
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
          <input
            type="text"
            pattern="\d{2}.\d{2}.\d{4}"
            name="brthDay"
            id="date"
            value={brthDay}
            onChange={this.handleUserInput}
            required
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
              <input
                type="text"
                name="telephone"
                id="tel"
                pattern="[\+]\d{3}\s[\(]\d{2}[\)]\s\d{3}[\-]\d{2}[\-]\d{2}"
                value={telephone}
                placeholder="+375 (00) 000-00-00"
                onChange={this.handleUserInput}
                required
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
          <Button variant="contained" color="primary" className="btn" onClick={this.formHandler}>
            Зарегистрироваться
          </Button>
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
