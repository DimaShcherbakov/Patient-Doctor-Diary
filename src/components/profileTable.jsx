import React from 'react';
import '../styles/tableProfile.scss';
import { connect } from 'react-redux';

const ProfileTable = (props) => {
  const { notes } = props.profile;
  return (
    <div className="wrapperTable">
      <table className="tablePatient">
        <tbody>
          <tr className="colName">
            <th className="date">Дата</th>
            <th className="time">Время</th>
            <th className="fName">ФИО</th>
            <th className="note">Заметка</th>
          </tr>
          {notes.map(el => (
            <tr key={el.date}>
              <td>{el.chosedDate}</td>
              <td>{el.time}</td>
              <td>{el.fullName}</td>
              <td>{el.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = state => ({ profile: state.profile });

export default connect(mapStateToProps)(ProfileTable);
