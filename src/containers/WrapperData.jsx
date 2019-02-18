import React from 'react';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import InputBase from '@material-ui/core/InputBase';
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
    return (
      <div className="wrapper-data">
        <div className="nav-panel">
          <div className="btns">
            <Button
              variant="contained"
              color="primary"
            >
              От А до Я
            </Button>
            <Button
              variant="contained"
              color="default"
            >
              От Я до А
            </Button>
            <Button
              variant="contained"
              color="primary"
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
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>

      </div>
    );
  }
}
export default WrapperData;
