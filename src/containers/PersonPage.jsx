import React from 'react';
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
        <section className="person-results">
          <div className="wrap-table">
            <table border="1px">
              <caption>Таблица диагнозов</caption>
              <tbody>
                <tr>
                  <th>Диагноз</th>
                  <th>Дата выставления</th>
                  <th>Примечания</th>
                  <th>Действие</th>
                </tr>
              </tbody>
            </table>
            <table border="1px">
              <caption>Таблица препаратов</caption>
              <tbody>
                <tr>
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
