import axios from 'axios';
import { Creators } from '../reducers/patientsReducer';

export function getListPatients(id, sort) {
  return (dispatch) => {
    axios
      .get(`http://localhost:5000/user/${id}/${sort}/patients`)
      .then((res) => {
        dispatch(Creators.listData(res.data));
      })
      .catch(err => console.log(err));
  };
}

function getURL(url) {
  return axios.get(url);
}

export function getDiagDrugs(id) {
  console.log(id)
  return (dispatch) => {
    axios.all([
      getURL(`http://localhost:5000/user/diagnosis/${id}`),
      getURL(`http://localhost:5000/user/pills/${id}`)
    ])
    .then((res) => {
      dispatch(Creators.allData(res))
    })
    .catch(err => {
      console.log(err)
    })
  };
}

export function clearData() {
  return Creators.clearData()
}

export function addDiagnosis(payload) {
  return (dispatch) => {
    axios
      .post('http://localhost:5000/user/patients/diagnos', payload)
      .then((res) => {
        dispatch(Creators.diagnosData(payload));
      })
      .catch(err => console.log(err));
  };
}

export function addDrugs(payload) {
  return (dispatch) => {
    axios
      .post('http://localhost:5000/user/patients/pills', payload)
      .then((res) => {
        console.log(res);
        dispatch(Creators.drugsData(payload));
      })
      .catch(err => console.log(err));
  };
}
