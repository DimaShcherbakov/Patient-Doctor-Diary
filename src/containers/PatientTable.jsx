import React from 'react';

class PatientTable extends React.Component{
  render() {
    return(
      <table border="1px">
        <caption>Taблица записей пациента</caption>
        <tbody>
          <tr>
            <th>Дата</th>
            <th>Препарат</th>
            <th>Доза</th>
            <th>Примечание</th>
          </tr>
        </tbody>
      </table> 
    )
  }
}

export default PatientTable;