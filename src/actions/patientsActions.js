import axios from 'axios';
import { Creators } from '../reducers/patientsReducer';

export default function getListPatients(id, sort) {
  return (dispatch) => {
    axios.get(`http://localhost:5000/user/${id}/${sort}/patients`)
      .then((res) => {
        dispatch(Creators.listData(res.data));
      })
      .catch(err => console.log(err));
  };
}
