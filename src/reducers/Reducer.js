const initialState = {
  enterUser: false,
};

const Reducer = (state = initialState, action) => {
  switch ( action.type ) {
    case 'CHANGE_STATE':
      state = {
        ...state,
        enterUser: action.payload,
      };
    break;
  };
  return state;
};

export default Reducer;