import axios from 'axios';

export function checkData (loginData) {
  axios.post('http://localhost:5000/login/', loginData)
    .then((res) => {
      console.log(res.data.token)
      localStorage.token = res.data.token;
      return {
        type: 'LOGIN_SUCCESS',
        payload: {
          token: res.data.token,
          isAuthorised: true,
        }
      }
    })
    .catch((err) => {
      return {
        type: 'LOGIN_FAILURE',
        payload: {
          isAuthorised: false,
        }
      }
    })
};
