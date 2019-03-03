import React from 'react';
import '../styles/profile.scss';
import '../styles/tableProfile.scss';
import '../styles/formProfile.scss';
import { Button } from '@material-ui/core';
import Calendar from 'react-calendar';
import { connect } from 'react-redux';
import Ava from '../assets/ava.jpg';
import getDate from '../utils/getDate';
import addMessage from '../actions/profileAction';
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
  }

  componentDidMount() {
    console.log('OK')
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
    addMessage(this.state);
  }

  render() {
    const arr = ['Имя', 'Отчество', 'Фамилия', 'Год рождения', 'e-mail', 'Телефон', 'Должность'];
    const data = [
      'владимир',
      'владимирович',
      'путин',
      '12.12.1212',
      'rfergrehgfokl@dfgdfg.dfg',
      '665154654156',
    ];
    const {
      chosedDate, time, fullName, note,
    } = this.state;

    console.log(this.props);
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
            <img src={Ava} alt="ava" />
          </div>
          <div className="profileData">
            <table className="personData">
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

const mapStateToProps = state => ({ profile: state.profile });

const mapDispatchToProps = dispatch => (
  {
    addMessage: (formData) => {
      dispatch(addMessage(formData));
    },
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
