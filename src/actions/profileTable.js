import axios from '../utils/axios';
import { Creators } from '../reducers/menuReducer';

export function openMenu(open) {
  return Creators.menuAction(!open);
}

export function getPersonalInfo(id) {
  return (dispatch) => {
    axios.get(`/user/${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch(Creators.getMenuData(res.data));
      })
      .catch(err => console.log(err));
  };
}
