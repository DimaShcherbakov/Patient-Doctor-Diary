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
      date: '',
      password: '',
      confirmPassword: '',
      password_has_error: false,
    };
  }

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
        <label>
          <input
            type="text"
            name="surname"
            placeholder="Фамилия"
            onChange={e => this.onChange(e)}
            value={this.state.surname}
            required
          />
        </label>
        <label>
          <input
            type="text"
            name="name"
            placeholder="Имя"
            onChange={e => this.onChange(e)}
            value={this.state.name}
            required
          />
        </label>
        <label>
          <input
            type="text"
            name="middleName"
            placeholder="Отчество"
            onChange={e => this.onChange(e)}
            value={this.state.middleName}
            required
          />
        </label>
        <label>
          <input
            type="text"
            name="job"
            placeholder="Место Работы"
            onChange={e => this.onChange(e)}
            value={this.state.job}
            required
          />
        </label>
        <label>
          <input
            type="text"
            name="registration"
            placeholder="Место Регистрации"
            onChange={e => this.onChange(e)}
            value={this.state.registration}
            required
          />
        </label>
        <label>
          Фото
          <input
            type="file"
            name="image"
            id="avatar"
            accept=".jpg, .jpeg, .png"
            onChange={e => this.onChange(e)}
            value={this.state.photo}
            required
          />
        </label>
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
        <label>
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            onChange={e => this.onChange(e)}
            value={this.state.password}
            required
          />
        </label>
        <label>
          <input
            type="password"
            className={this.state.password_has_error ? 'errorInput' : 'confirmPass'}
            name="confirmPassword"
            placeholder="Подтвердите пароль"
            value={this.state.confirmPassword}
            onChange={e => this.onChange(e)}
            required
          />
        </label>
        <span className={this.state.password_has_error ? '' : 'appendError'}>
          password do not match
        </span>
        <button onClick={() => this.onSubmit()} type="submit">
          Submit
        </button>
      </form>
    );
  }
}
export default FormRegPatient;
