import axios from 'axios';

export default function getListPatients(id, sort) {
  return (dispatch) => {
    axios.get(`http://localhost:5000/user/${id}/${sort}/patients`)
      .then((res) => {
        dispatch({
          type: 'LIST_DATA',
          payload: {
            dataArr: res.data,
          },
        });
      })
      .catch(err => console.log(err));
  };
}
