import axios from 'axios';

export function openMenu(open) {
  return {
    type: 'MENU_ACTION',
    payload: !open,
  };
};

export function getPersonalInfo(id) {
  return (dispatch) => {
    axios.get(`http://localhost:5000/user/${id}`)
      .then((res) => {
        dispatch({
          type: 'GET_MENU_DATA',
          payload: {
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            thirdName: res.data.thirdName,
          },
        });
      })
      .catch(err => console.log(err));
  };
}
