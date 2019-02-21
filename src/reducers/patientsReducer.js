const initialState = {
  dataArr: [],
};

const patientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LIST_DATA':
      state = {
        ...state,
        dataArr: action.payload.dataArr,
      };
    console.log(state)
    break;
  };
  return state;
};

export default patientsReducer;
