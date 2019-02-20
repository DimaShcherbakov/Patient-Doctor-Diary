const initialState = {
  dataArr: undefined,
};

const patientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LIST_DATA':
      state = {
        ...state,
        dataArr: action.payload.dataArr,
      };
    break;
  };
  return state;
};

export default patientsReducer;
