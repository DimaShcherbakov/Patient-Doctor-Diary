import axios from 'axios';
import { Creators } from '../reducers/loginReducer';

export function checkData(loginData) {
  return (dispatch) => {
    axios.post('http://localhost:5000/login/', loginData)
      .then((res) => {
        localStorage.token = res.data.token;
        localStorage.userId = res.data.id;
        localStorage.status = loginData.status;
        dispatch(Creators.loginSuccess(res.data.token, res.data.id));
      })
      .catch((err) => {
        dispatch(Creators.loginFailure());
      });
  };
}

export function logout() {
  localStorage.token = ' ';
  localStorage.userId = ' ';
  localStorage.status = ' ';
  return dispatch => (
    dispatch(Creators.logout())
  );
}
