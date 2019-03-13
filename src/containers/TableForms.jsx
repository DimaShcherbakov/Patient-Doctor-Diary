import React from 'react';
import '../styles/PatientForms.scss';

class TableForms extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return(
      <section className="add-data-form">
        <div className="wrap-form">
          <p className="header">Добавить диaгноз</p>
          <form className="diagnosis-form forms">
            <div className="inputs">
              <label htmlFor="date">Дата
                <input type="date" name="" id="date"/>
              </label>
              <label htmlFor="diagnosis">Диагноз
                <input type="text" name="" id="diagnosis"/>
              </label>
            </div>
            <div className="using">
              <label htmlFor="notes">Примечания</label>
              <input type="text" id="notes"/>
            </div>
            <input type="submit" value="Добавить"/>
          </form>
        </div>
        <div className="wrap-form">
          <p className="header">Добавить препараты</p>
          <form className="pills-form forms">
            <div className="inputs inputs-2">
              <label htmlFor="date">Дата
                <input type="date" name="" id="date" />
              </label>
              <label htmlFor="pill">Препарат
                <input type="text" name="" id="pill" />
              </label>
            </div>
            <div className="using">
              <label htmlFor="dose">Применение</label>
              <input type="text" name="" id="dose" />
              <label htmlFor="notes">Примечания</label>
              <input type="text" name="" id="notes"/>
            </div>
            <input type="submit" value="Добавить" />
          </form>
        </div>
      </section>
    )
  }
}

export default TableForms;
