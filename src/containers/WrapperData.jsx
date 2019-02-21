import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import InputBase from '@material-ui/core/InputBase';
import getListPatients from '../actions/patientsReducer';
import RegPatient from '../components/RegPatient.jsx';
import Card from '../components/Card.jsx';
import '../styles/wrapperData.scss';

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

  hidePopup(e) {
    e.preventDefault();
    this.setState({
      showPopup: false,
    });
  }

  render() {
    const { showPopup } = this.state;
    const { getListPatients } = this.props;
    const { patients } = this.props;
    const id = localStorage.userId;

    const listPatients = patients.dataArr.map(element => (
      <Card
        key={element.id_pacient}
        info={{
          fN: element.first_name,
          lN: element.last_name,
          tN: element.third_name,
          bD: element.brth_day,
        }}
      />
    ));
    console.log(patients);
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
              <InputBase
                placeholder="Search…"
              />
            </div>
          </div>
          <Fab
            color="primary"
            aria-label="Add"
            className="add-pers"
            onClick={this.showPopup}
          >
            <AddIcon />
          </Fab>
        </div>
        <RegPatient
          show={showPopup}
          hide={this.hidePopup}
        />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListPatients: (id, sortType) => {
      dispatch(getListPatients(id, sortType));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WrapperData);
