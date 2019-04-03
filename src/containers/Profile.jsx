import React from 'react';
import '../styles/profile.scss';
import '../styles/formProfile.scss';
import { Button } from '@material-ui/core';
import Calendar from 'react-calendar';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import Ava from '../assets/default.jpg';
import getDate from '../utils/getDate';
import { getPersonalInfo } from '../actions/menuActions';
import { addMessage } from '../actions/profileAction';
import ProfileTable from '../components/profileTable.jsx';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.addNote = this.addNote.bind(this);
    this.state = {
      chosedDate: '',
      time: '',
      fullName: '',
      note: '',
    };
    this.baseState = this.state;
  }

  onChange(date) {
    const selectedDate = getDate(date);
    this.setState({ chosedDate: selectedDate });
  }

  handleUserInput(e) {
    const { name } = e.target;
    const { value } = e.target;
    this.setState({ [name]: value });
  }

  addNote(e) {
    e.preventDefault();
    const { addMessage } = this.props;
    addMessage({ formData: this.state, id: uuid() });
  }

  render() {
    const arr = ['Фамилия', 'Имя', 'Отчество', 'Год рождения', 'e-mail', 'Телефон', 'Должность'];
    const {
      chosedDate, time, fullName, note,
    } = this.state;
    const {
      fN, lN, tN, em, bday, tel, pos, photo
    } = this.props.menu;
    const data = [fN, lN, tN, bday, em, tel, pos];
    return (
      <div className="container">
        <div className="userInfo">
          <div className="wrapAddNote">
            <div className="calendar">
              <Calendar onChange={this.onChange} value={this.state.date} />
            </div>
            <div className="wrapForm">
              <form className="formPatient" onSubmit={this.addNote}>
                <p className="formName">Добавить...</p>
                <div className="wrapDate">
                  <div className="timeField">
                    <input name="time" type="time" onChange={this.handleUserInput} value={time} />
                  </div>
                  <div className="dateField">
                    <input name="chosedData" value={chosedDate} readOnly />
                  </div>
                </div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="ФИО"
                  className="fullname"
                  onChange={this.handleUserInput}
                  value={fullName}
                />
                <textarea
                  name="note"
                  className="noteField"
                  placeholder="Заметка"
                  rows="6"
                  cols="30"
                  onChange={this.handleUserInput}
                  value={note}
                />
                <Button
                  type="submit"
                  color="primary"
                  className="btn"
                >
                  Добавить
                </Button>
              </form>
            </div>
          </div>
          <ProfileTable />
        </div>
        <div className="profileInfo">
          <div className="photo">
            <img src={photo !== '' ? photo : Ava} alt="ava" />
          </div>
          <div className="profileData">
            <table className="table">
            {/* <table className="personData"></table> */}
              <tbody>
                {arr.map((element, index) => (
                  <tr key={index}>
                    <td>{element}</td>
                    <td>{data[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    profile: state.profile,
    menu: state.menu,
  }
);

const mapDispatchToProps = dispatch => (
  {
    addMessage: (formData) => {
      dispatch(addMessage(formData));
    },
    getData: (data) => {
      dispatch(getPersonalInfo(data));
    },
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
