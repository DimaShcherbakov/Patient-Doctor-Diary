import axios from 'axios';

export function checkData(loginData) {
  return (dispatch) => {
    axios.post('http://localhost:5000/login/', loginData)
      .then((res) => {
        localStorage.token = res.data.token;
        localStorage.userId = res.data.id;
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            token: res.data.token,
            userId: res.data.id,
            isAuthorised: true,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: {
            isAuthorised: false,
            error: true,
          },
        });
      });
  };
}

export function logout() {
  localStorage.token = ' ';
  localStorage.userId = ' ';
  return (dispatch) => {
    dispatch({
      type: 'LOGOUT',
      payload: {
        token: '',
        userId: '',
        isAuthorised: false,
      },
    });
  };
}
