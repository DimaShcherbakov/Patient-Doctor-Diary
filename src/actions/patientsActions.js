import axios from '../utils/axios';
import { Creators } from '../reducers/patientsReducer';

export function getListPatients(id, sort) {
  return (dispatch) => {
    axios
      .get(`/user/${id}/${sort}/patients`)
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
  return (dispatch) => {
    axios.all([
      getURL(`/user/diagnosis/${id}`),
      getURL(`/user/pills/${id}`),
    ])
    .then((res) => {
      dispatch(Creators.allData(res));
    })
    .catch(err => {
      console.log(err);
    })
  };
}

export function clearData() {
  return Creators.clearData();
}

export function addDiagnosis(payload) {
  return (dispatch) => {
    axios
      .post('/user/patients/diagnos', payload)
      .then((res) => {
        dispatch(Creators.diagnosData(payload));
      })
      .catch(err => console.log(err));
  };
}

export function addDrugs(payload) {
  return (dispatch) => {
    axios
      .post('/user/patients/pills', payload)
      .then((res) => {
        dispatch(Creators.drugsData(payload));
      })
      .catch(err => console.log(err));
  };
}

export function getPersonalData(id) {
  return (dispatch) => {
    axios
      .get(`/patients/${id}`)
      .then((res) => {
        // console.log(res);
        dispatch(Creators.patient_data(res.data[0]));
      })
      .catch(err => console.log(err));
  };
}
