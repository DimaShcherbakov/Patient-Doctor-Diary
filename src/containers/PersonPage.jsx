import React from 'react';
import { connect } from 'react-redux';
import TableForms from './TableForms.jsx';
import { Link } from 'react-router-dom';
import '../styles/persPage.scss';

class PersonPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    console.log(this.props.data)
    const { diagnosArr } = this.props.data;
    const { drugsArr } = this.props.data;

    return (
      <div className="container-pers-page">
        <section className="wrapper-page">
          <div className="wrap">
            <div className="data">
              <h3>Дневник Пациента</h3>
              <p>Фамилия <span></span></p>
              <p>Имя <span></span></p>
              <p>Отчество <span></span></p>
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
            <table border="1px" width="100%">
              <caption>Таблица диагнозов</caption>
              <tbody>
                <tr>
                  <th>Дата</th>
                  <th>Диагноз</th>
                  <th>Примечания</th>
                  <th>Действие</th>
                </tr>
                { diagnosArr.map((el, i) => (
                    <tr key={el.id_diagnosis}>
                      <td>{el.date}</td>
                      <td>{el.diagnosis_name}</td>
                      <td>{el.note}</td>
                      <td>Action</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            <table border="1px">
              <caption>Таблица препаратов</caption>
              <tbody>
                <tr>
                  <th>Дата</th>
                  <th>Препарат</th>
                  <th>Дозировка</th>
                  <th>Примечания</th>
                  <th>Действие</th>
                </tr>
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
          <Link to="/main/patients/:id/result">Просмотреть записи</Link>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({ data: state.patients });

export default connect(mapStateToProps, null)(PersonPage);
