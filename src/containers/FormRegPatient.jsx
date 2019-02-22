import React, { Component } from 'react';
import '../styles/registerPeople.scss';

class FormRegPatient extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
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
      password_has_error: false,
    };
  }

  // this.state = {
  //   surname: '',
  //   name: '',
  //   middleName: '',
  //   job: '',
  //   registration: '',
  //   file: '',
  //   email: '',
  //   bday: '',
  //   password: '',
  //   confirmPassword: '',
  //   telephone: '',
  //   password_has_error: false,
  // };

  checkPassword() {
    if (!this.state.password || this.state.password != this.state.confirmPassword) {
      this.setState({ password_has_error: true });
    } else {
      this.setState({ password_has_error: false });
    }
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        if (name == 'password' || name == 'confirmPassword') this.checkPassword();
      },
    );
  }
  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <form className="registerPeople">
        <span className="formName">Регистрация Пациента</span>
        <div className="wrap-input">
          <input
            type="text"
            name="surname"
            placeholder="Фамилия"
            onChange={e => this.onChange(e)}
            value={this.state.surname}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Имя"
            onChange={e => this.onChange(e)}
            value={this.state.name}
            required
          />
        </div>
        <div className="wrap-input">
          <input
            type="text"
            name="middleName"
            placeholder="Отчество"
            onChange={e => this.onChange(e)}
            value={this.state.middleName}
            required
          />
          <input
            type="date"
            name="bday"
            onChange={e => this.onChange(e)}
            value={this.state.bday}
            required
          />
        </div>
        <input
          type="tel"
          name="telephone"
          placeholder="Номер телефона"
          onChange={e => this.onChange(e)}
          value={this.state.telephone}
          required
        />
        <input
          type="text"
          name="job"
          placeholder="Место Работы"
          onChange={e => this.onChange(e)}
          value={this.state.job}
          required
        />
        <div className="wrap-input">
          <input
            type="text"
            name="registration"
            placeholder="Место Регистрации"
            onChange={e => this.onChange(e)}
            value={this.state.registration}
            required
          />
          <input
            type="file"
            name="file"
            data-buttonText="Фото"
            accept=".jpg, .jpeg, .png"
            onChange={e => this.onChange(e)}
            value={this.state.file}
          />
        </div>
        <label>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            onChange={e => this.onChange(e)}
            value={this.state.email}
            required
          />
        </label>
        <div className="wrap-input">
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            onChange={e => this.onChange(e)}
            value={this.state.password}
            required
          />
          <input
            type="password"
            className={this.state.password_has_error ? 'errorInput' : 'confirmPass'}
            name="confirmPassword"
            placeholder="Подтвердите пароль"
            value={this.state.confirmPassword}
            onChange={e => this.onChange(e)}
            required
          />
        </div>
        <span className={this.state.password_has_error ? 'appendError' : 'hideError'}>
          Пароли не совпадают
        </span>
        <button onClick={() => this.onSubmit()} type="submit">
          Подтвердить
        </button>
      </form>
    );
  }
}
export default FormRegPatient;
