import axios from 'axios';
import { Creators } from '../reducers/menuReducer';

export function openMenu(open) {
  return Creators.menuAction(!open);
}

export function getPersonalInfo(id) {
  return (dispatch) => {
    axios.get(`http://localhost:5000/user/${id}`)
      .then((res) => {
        dispatch(Creators.getMenuData(res.data));
      })
      .catch(err => console.log(err));
  };
}
