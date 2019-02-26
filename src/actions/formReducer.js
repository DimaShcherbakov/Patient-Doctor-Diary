import axios from 'axios';
import { Creators } from '../reducers/formReducer';

export function addPatient(id, data) {
  return (dispatch) => {
    axios.post(`http://localhost:5000/registration/patient`, data)
      .then((res) => {
        console.log(res);
        dispatch(Creators.addPatient());
      })
      .catch(err => console.log(err));
  };
}