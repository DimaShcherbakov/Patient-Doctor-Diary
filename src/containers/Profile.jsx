import React from 'react';
import '../styles/profile.scss';
import '../styles/tableProfile.scss';
import '../styles/formProfile.scss';
import Ava from '../assets/ava.jpg';
import getDate from '../utils/getDate';
import { Button } from '@material-ui/core';

class Profile extends React.Component {
  constructor(props) {
    super(props);
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

    return (
      <div className="container">
        <div className="userInfo">
          <div className="wrapperTable" />
          <table className="tablePatient">
            <tr className="colName">
              <th class="date">Дата</th>
              <th className="time">Время</th>
              <th class="fName">ФИО</th>
              <th className="note">Заметка</th>
            </tr>
            <tr>
              <td class="date">Дата</td>
              <td className="time">Время</td>
              <td class="fName">ФИО</td>
              <td className="note">Заметка</td>
            </tr>
            <tr>
              <td class="date">Дата</td>
              <td className="time">Время</td>
              <td class="fName">ФИО</td>
              <td className="note">Заметка</td>
            </tr>
            <tr>
              <td class="date">Дата</td>
              <td className="time">Время</td>
              <td class="fName">ФИО</td>
              <td className="note">Заметка</td>
            </tr>
          </table>
          <div className="wrapForm">
            <form className="formPatient">
              <p className="formName">Добавить...</p>
              <input className="dateField" value={getDate()} readOnly />
              <input type="time" className="timeField" />
              <input type="text" placeholder="ФИО" />
              <textarea className="noteField" placeholder="Заметка" />
              <Button type="submit" color="primary" className="btn">
                Добавить
              </Button>
            </form>
          </div>
        </div>
        <div className="profileInfo">
          <div className="photo">
            <img src={Ava} alt="ava" />
          </div>
          <div className="profileData">
            <table className="personData">
              {arr.map((element, index) => (
                <tr key={index}>
                  <td>{element}</td>
                  <td>{data[index]}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
