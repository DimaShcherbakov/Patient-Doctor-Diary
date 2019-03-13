import React from 'react';
import '../styles/tableProfile.scss';
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/DeleteForeverOutlined';
import { removeRow } from '../actions/profileAction';

class ProfileTable extends React.Component {
  constructor(props) {
    super(props);
    this.onDeleteRow = this.onDeleteRow.bind(this);
  }

  onDeleteRow(id) {
    const { deleteRow } = this.props;
    deleteRow(id);
  }

  render() {
    const { rows } = this.props;
    return (
      <div className="wrapperTable">
        <table className="tablePatient">
          <tbody>
            <tr className="colName">
              <th className="deleteField" />
              <th className="date">Дата</th>
              <th className="time">Время</th>
              <th className="fName">ФИО</th>
              <th className="note">Заметка</th>
            </tr>
            {rows.map(row => (
              <tr key={row.id}>
                <td className="deleteButton">
                  <span className="deleteButton">
                    <DeleteIcon onClick={() => this.onDeleteRow(row.id)} />
                  </span>
                </td>
                <td>{row.formData.chosedDate}</td>
                <td>{row.formData.time}</td>
                <td>{row.formData.fullName}</td>
                <td>{row.formData.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rows: state.profile,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteRow: id => {
      dispatch(removeRow(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileTable);
