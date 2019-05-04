import axios from '../utils/axios';
import { Creators } from '../reducers/loginReducer';

export function checkData(loginData) {
  return (dispatch) => {
    axios.post('/login', loginData)
      .then((res) => {
        localStorage.token = res.data.token;
        localStorage.userId = res.data.id;
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
  return dispatch => (
    dispatch(Creators.logout())
  );
}
