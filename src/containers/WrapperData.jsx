import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { Link } from 'react-router-dom';
import InputBase from '@material-ui/core/InputBase';
import getListPatients from '../actions/patientsActions';
import { reset } from '../actions/formActions';
import Card from '../components/Card.jsx';
import '../styles/wrapperData.scss';
import FormRegPatient from './FormRegPatient.jsx';

class WrapperData extends React.Component {
  constructor() {
    super();
    this.showPopup = this.showPopup.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
    this.state = {
      showPopup: false,
    };
  }

  componentDidMount() {
    const id = localStorage.userId;
    const { getListPatients } = this.props;
    getListPatients(id, 'norm');
  }

  showPopup(e) {
    e.preventDefault();
    this.setState({
      showPopup: true,
    });
  }

  hidePopup() {
    this.setState({
      showPopup: false,
    });
  }

  render() {
    const { showPopup } = this.state;
    const { getListPatients } = this.props;
    const { patients } = this.props;
    const id = localStorage.userId;
    const { form, reset } = this.props;
    const listPatients = patients.dataArr.map(element => (
      <Link key={element.id_pacient} to={`/main/patients/${element.id_pacient}`}>
        <Card
          info={{
            fN: element.first_name,
            lN: element.last_name,
            tN: element.third_name,
            bD: element.brth_day,
          }}
        />
      </Link>
    ));
    console.log(form.success);
    if (form.success) {
      reset();
      getListPatients(id, 'norm');
    }
    return (
      <div className="wrapper-data">
        <div className="nav-panel">
          <div className="btns">
            <Button
              variant="contained"
              color="primary"
              onClick={() => getListPatients(id, 'asc')}
            >
              От А до Я
            </Button>
            <Button
              variant="contained"
              color="default"
              onClick={() => getListPatients(id, 'desc')}
            >
              От Я до А
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => getListPatients(id, 'norm')}
            >
              По дате добавления
            </Button>
            <div className="search">
              <div className="searchIcon">
                <SearchIcon />
              </div>
              <InputBase placeholder="Search…" />
            </div>
          </div>
          <Fab color="primary" aria-label="Add" className="add-pers" onClick={this.showPopup}>
            <AddIcon />
          </Fab>
        </div>

        <FormRegPatient show={showPopup} hide={this.hidePopup} />

        <div className="wrap-cards">
          {listPatients}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    patients: state.patients,
    form: state.form,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListPatients: (id, sortType) => {
      dispatch(getListPatients(id, sortType));
    },
    reset: () => {
      dispatch(reset());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WrapperData);
