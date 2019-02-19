const initialState = {
  openMenu: false,
};

const menuReducer = (state = initialState, action) => {
  switch ( action.type ) {
    case 'MENU_ACTION':
      state = {
        ...state,
        openMenu: action.payload,
      };
    break;
  };
  return state;
};

export default menuReducer;
