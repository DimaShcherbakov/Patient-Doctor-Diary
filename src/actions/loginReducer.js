import axios from 'axios';
import { Creators } from '../reducers/loginReducer';

export function checkData(loginData) {
  return (dispatch) => {
    console.log(loginData)
    axios.post('http://localhost:5000/login/', loginData)
      .then((res) => {
        console.log("Login sucksess",res)
        localStorage.token = res.data.token;
        localStorage.userId = res.data.id;
        dispatch(Creators.loginSuccess(res.data.token, res.data.id));
      })
      .catch((err) => {
        console.log("Login err",err)
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
