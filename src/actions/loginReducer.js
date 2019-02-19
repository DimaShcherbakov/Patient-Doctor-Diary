import axios from 'axios';

export function checkData (loginData) {
  return (dispatch) => {
    console.log(loginData);
    axios.post('http://localhost:5000/login/', loginData)
      .then((res) => {
        console.log(res.data.token)
        localStorage.token = res.data.token;
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            token: res.data.token,
            isAuthorised: true,
          }
        })
      })
      .catch((err) => {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: {
            isAuthorised: false,
          }
        })
      })
  }
};
