import axios from 'axios';
import { Creators } from '../reducers/formReducer';
// здесь всё работает
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
// здесь не работает
export function addDoctor(data) {
  console.log(data)// данные приходят
  return (dispatch) => {
    console.log(data)// данные не приходят
    axios.post('http://localhost:5000/register', data)
      .then((res) => {
        console.log(res)
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
