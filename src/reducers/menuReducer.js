const initialState = {
  openMenu: false,
  fN: '',
  lN: '',
  tN: '',
};

const menuReducer = (state = initialState, action) => {
  switch ( action.type ) {
    case 'MENU_ACTION':
      state = {
        ...state,
        openMenu: action.payload,
      };
    break;
    case 'GET_MENU_DATA':
      state = {
        ...state,
        fN: action.payload.firstName,
        lN: action.payload.lastName,
        tN: action.payload.thirdName,
      };
      console.log(state);
    break;
  };
  return state;
};

export default menuReducer;
