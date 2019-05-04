import axios from '../utils/axios';
import { Creators } from '../reducers/formReducer';

export function addPatient(data) {
  return (dispatch) => {
    axios.post('/registration/patient', data)
      .then((res) => {
        dispatch(Creators.addPatient());
      })
      .catch(err => console.log(err));
  };
}

export function addDoctor(data) {
  return (dispatch) => {
    axios.post('/register', data)
      .then((res) => {
        if (res.data.error) {
          dispatch(Creators.wrongEmail());
        } else {
          dispatch(Creators.addDoctor());
        }
      })
      .catch(err => console.log(err));
  };
}

export const reset = () => (Creators.reset());
