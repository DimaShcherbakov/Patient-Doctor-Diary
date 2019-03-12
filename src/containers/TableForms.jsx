import React from 'react';
import '../styles/PatientForms.scss';

class TableForms extends React.Component{
  render() {
    return(
      <section className="add-data-form">
          <div className="wrap-form">
            <p className="header">Добавить дигноз</p>
            <form className="diagnosis-form forms">
              <div className="inputs">
                <label htmlFor="">Дата
                  <input type="date" name="" id="date"/>
                </label>
                <label htmlFor="">Диагноз
                  <input type="text" name="" id="diagnosis"/>
                </label>
              </div>
              <div className="using">
                <label>Примечания</label>
                <input type="text" value=""/>
              </div>
              <input type="submit" value="Добавить"/>
            </form>
          </div>
          <div className="wrap-form">
            <p className="header">Добавить препараты</p>
            <form className="pills-form forms">
              <div className="inputs inputs-2">
                <label htmlFor="">Дата
                  <input type="date" name="" id="date" />
                </label>
                <label htmlFor="">Препарат
                  <input type="text" name="" id="pill" />
                </label>
              </div>
              <div className="using">
                <label htmlFor="">Применение</label>
                <input type="text" name="" id="dose" />
                <label>Примечания</label>
                <input type="text" name="" value=""/>
              </div>
              <input type="submit" value="Добавить" />
            </form>
          </div>
        </section>
    )
  }
}

export default TableForms;
