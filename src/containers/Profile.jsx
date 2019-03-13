import React from 'react';
import '../styles/profile.scss';
import '../styles/formProfile.scss';
import Ava from '../assets/ava.jpg';
import getDate from '../utils/getDate';
import { Button } from '@material-ui/core';
import Calendar from 'react-calendar';
import { connect } from 'react-redux';
import { addRow } from '../actions/profileAction';
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

  handleUserInput(e) {
    const { name } = e.target;
    const { value } = e.target;
    this.setState({ [name]: value });
  }

  onChange(date) {
    const selectedDate = getDate(date);
    this.setState({ chosedDate: selectedDate });
  }
  addNote(e) {
    e.preventDefault();
    const { onAddNewRow } = this.props;
    onAddNewRow(this.state);
    this.setState(this.baseState);
  }

  render() {
    const arr = ['имя', 'отчество', 'фамилия', 'год рождения', 'e-mail', 'телефон'];
    const data = [
      'владимир',
      'владимирович',
      'путин',
      '12.12.1212',
      'rfergrehgfokl@dfgdfg.dfg',
      '665154654156',
    ];
    const { chosedDate, time, fullName, note } = this.state;
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
                  autoComplete="off"
                  onChange={this.handleUserInput}
                  value={fullName}
                />
                <textarea
                  name="note"
                  className="noteField"
                  placeholder="Заметка"
                  rows="4"
                  onChange={this.handleUserInput}
                  value={note}
                />
                <Button type="submit" color="primary" className="btn">
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

const mapDispatchToProps = dispatch => {
  return {
    onAddNewRow: formData => {
      dispatch(addRow(formData));
    },
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(Profile);
