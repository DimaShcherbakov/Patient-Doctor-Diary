import React from 'react';
import TableForms from './TableForms.jsx';
import { Link } from 'react-router-dom';
import '../styles/persPage.scss';

class PersonPage extends React.Component {
  render() {
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
              <img src="" alt="personPhoto"/>
            </div>
          </div>
          <div className="other-info">
            <p></p>
          </div>
        </section>
        <TableForms />
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
              </tbody>
            </table>
          </div>
          <Link to="/main/patients/:id/result">Просмотреть записи</Link>
        </section>
      </div>
    );
  }
}

export default PersonPage;
