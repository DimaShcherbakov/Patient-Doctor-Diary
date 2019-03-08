import axios from 'axios';
import { Creators } from '../reducers/menuReducer';

export function openMenu(open) {
  return Creators.menuAction(!open);
}

export function getPersonalInfo(id, status) {
  console.log(id)
  return (dispatch) => {
    if (status === 'doctor') {
      axios.get(`http://localhost:5000/user/${id}/${status}`)
        .then((res) => {
          console.log(res.data);
          dispatch(Creators.getMenuData(res.data));
        })
        .catch(err => console.log(err));
    } else {
      console.log(id, status)
      axios.get(`http://localhost:5000/user/${id}/${status}`)
        .then((res) => {
          console.log(res.data);
          dispatch(Creators.getPatientData(res.data));
        })
        .catch(err => console.log(err));
    }
  }
}
