import React from 'react';
import { connect } from 'react-redux';
import {
  addDiagnosis,
  addDrugs,
  getDiagDrugs,
  clearData,
} from '../actions/patientsActions';
import '../styles/PatientForms.scss';
import axios from '../utils/axios';

class TableForms extends React.Component {
  constructor(props) {
    super(props);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.addDiagnosis = this.addDiagnosis.bind(this);
    this.addDrugs = this.addDrugs.bind(this);
    this.addFile = this.addFile.bind(this);
    this.state = {};
  }

  componentDidMount() {
    const { id, getDataToTables } = this.props;
    getDataToTables(id);
  }

  componentWillUnmount() {
    const { clearData } = this.props;
    clearData();
  }

  handleUserInput(e) {
    const { name } = e.target;
    const { value } = e.target;
    this.setState({ [name]: value });
  }

  addDiagnosis(e) {
    e.preventDefault();
    const { addDiagnosis, id } = this.props;
    const { d_date, d_notes, diagnos } = this.state;
    addDiagnosis({
      id,
      diagnosis_name: diagnos,
      date: d_date,
      note: d_notes,
    });
  }

  addDrugs(e) {
    e.preventDefault();
    const { addDrugs } = this.props;
    const { id } = this.props;
    const { p_date, p_notes, pill, p_use, diagnos } = this.state;
    addDrugs({
      id,
      drugs: pill,
      dose: p_use,
      date: p_date,
      note: p_notes,
    });
  }

  addFile(e) {
    e.preventDefault();
    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('date', this.fileDate.value);
    data.append('id', this.props.id);
    axios.post('/fileupload', data)
      .then((res) => {
        this.setState({
          link: `http://localhost:5000/${res.data.file}`,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <section className="add-data-form">
        <div className="wrap-form">
          <p className="header">Добавить диaгноз</p>
          <form
            className="diagnosis-form forms"
            onSubmit={this.addDiagnosis}
          >
            <div className="inputs">
              <label htmlFor="date">Дата
                <input
                  type="date"
                  name="d_date"
                  id="date"
                  onChange={this.handleUserInput}
                />
              </label>
              <label htmlFor="diagnosis">Диагноз
                <input
                  type="text"
                  name="diagnos"
                  id="diagnosis"
                  onChange={this.handleUserInput}
                />
              </label>
            </div>
            <div className="using">
              <label htmlFor="notes">Примечания</label>
              <input
                type="text"
                name="d_notes"
                id="notes"
                onChange={this.handleUserInput}
              />
            </div>
            <input type="submit" value="Добавить" />
          </form>
        </div>
        <div className="wrap-form">
          <p className="header">Добавить обследование</p>
          <form
            className="diagnosis-form forms"
            onSubmit={this.addFile}
          >
            <div className="inputs">
              <label htmlFor="date">Дата
                <input
                  type="date"
                  name="exam_date"
                  id="date"
                  ref={(ref) => { this.fileDate = ref; }}
                />
              </label>
            </div>
            <div className="using">
              <label htmlFor="file">Файл обследования</label>
              <input
                type="file"
                name="filename"
                id="file"
                ref={(ref) => { this.uploadInput = ref; }}
              />
            </div>
            <input type="submit" value="Добавить" />
            <a href={this.state.link}>File for uploading</a>
          </form>
        </div>
        <div className="wrap-form">
          <p className="header">Добавить препараты</p>
          <form
            className="pills-form forms"
            onSubmit={this.addDrugs}
          >
            <div className="inputs inputs-2">
              <label htmlFor="date">Дата
                <input
                  type="date"
                  name="p_date"
                  id="date"
                  onChange={this.handleUserInput}
                />
              </label>
              <label htmlFor="pill">Препарат
                <input
                  type="text"
                  name="pill"
                  id="pill"
                  onChange={this.handleUserInput}
                />
              </label>
            </div>
            <div className="using">
              <label htmlFor="dose">Применение</label>
              <input
                type="text"
                name="p_use"
                id="dose"
                onChange={this.handleUserInput}
              />
              <label htmlFor="notes">Примечания</label>
              <input
                type="text"
                name="p_notes"
                id="notes"
                onChange={this.handleUserInput}
              />
            </div>
            <input type="submit" value="Добавить" />
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({ form: state.patients });
const mapDispatchToProps = dispatch => (
  {
    addDiagnosis: data => dispatch(addDiagnosis(data)),
    addDrugs: data => dispatch(addDrugs(data)),
    getDataToTables: data => dispatch(getDiagDrugs(data)),
    clearData: () => dispatch(clearData()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(TableForms);
