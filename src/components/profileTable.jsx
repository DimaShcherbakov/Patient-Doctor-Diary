import React from 'react';
import '../styles/tableProfile.scss';
import { connect } from 'react-redux';

const ProfileTable = (props) => {
    const { rows } = props;
  return (
    <div className="wrapperTable">
      <table className="tablePatient">
        <tr className="colName">
          <th className="date">Дата</th>
          <th className="time">Время</th>
          <th className="fName">ФИО</th>
          <th className="note">Заметка</th>
        </tr>
        {rows.map(row => (
          <tr key={row.date}>
            <td>{row.chosedDate}</td>
            <td>{row.time}</td>
            <td>{row.fullName}</td>
            <td>{row.note}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    rows: state.profile,
  };
};
export default connect(mapStateToProps)(ProfileTable);
