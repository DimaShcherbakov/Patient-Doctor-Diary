import axios from 'axios';
import { Creators } from '../reducers/formReducer';

export function addPatient(data) {
  return (dispatch) => {
    axios.post('http://localhost:5000/registration/patient', data)
      .then((res) => {
        console.log(res);
        dispatch(Creators.addPatient());
      })
      .catch(err => console.log(err));
  };
}

export function addDoctor(data) {
  return (dispatch) => {
    axios.post(' http://localhost:5000/registration/patient', data)
      .then((res) => {
        console.log(res);
        dispatch(Creators.addDoctor());
      })
      .catch(err => console.log(err));
  };
}

export const reset = () => (Creators.reset());
