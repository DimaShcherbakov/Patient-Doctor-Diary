import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TableForms from './TableForms.jsx';
import { getPersonalData } from '../actions/patientsActions';
import '../styles/persPage.scss';

class PersonPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    console.log(this.props.data)
    const { getPersData } = this.props
    getPersData(this.props.match.params.id);
  }

  render() {
    const { diagnosArr } = this.props.data;
    const { drugsArr } = this.props.data;
    const { patient_data } = this.props.data;

    console.log(this.props.data)
    return (
      <div className="container-pers-page">
        <section className="wrapper-page">
          <div className="wrap">
            <div className="data">
              <h3>Дневник Пациента</h3>
              <p>{ patient_data.lastName }</p>
              <p>{ patient_data.firstName}</p>
              <p>{ patient_data.thirdName }</p>
            </div>
            <div className="photo">
              <img src="" alt="personPhoto" />
            </div>
          </div>
          <div className="other-info">
            <p></p>
          </div>
        </section>
        <TableForms id={this.props.match.params.id} />
        <section className="person-results">
          <div className="wrap-table">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Дата</th>
                  <th scope="col">Диагноз</th>
                  <th scope="col">Примечания</th>
                  <th scope="col">SMTH</th>
                </tr>
              </thead>
              <tbody>
                { diagnosArr.map((el, i) => (
                  <tr key={el.id_diagnosis}>
                    <td>{el.date}</td>
                    <td>{el.diagnosis_name}</td>
                    <td>{el.note}</td>
                    <td>SMTH</td>
                  </tr>
                ))
                }
              </tbody>
            </table>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th>Дата</th>
                  <th>Препарат</th>
                  <th>Дозировка</th>
                  <th>Примечания</th>
                  <th>SMTH</th>
                </tr>
              </thead>
              <tbody>
                { drugsArr.map((el, i) => (
                  <tr key={el.id_diary}>
                    <td>{el.date}</td>
                    <td>{el.drugs}</td>
                    <td>{el.dose}</td>
                    <td>{el.note}</td>
                    <td>Action</td>
                  </tr>
                ))
                }
              </tbody>
            </table>
          </div>
          <Link to={`/main/patients/${this.props.match.params.id}/result`}>Просмотреть записи</Link>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({ data: state.patients });
const mapDispatchToProps = dispatch => ({ getPersData: id => dispatch(getPersonalData(id)) });

export default connect(mapStateToProps, mapDispatchToProps)(PersonPage);
