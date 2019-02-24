import { createActions, createReducer } from 'reduxsauce'

export const { Types, Creators } = createActions({
  menuAction: ['openMenu'],
  getMenuData: ['fN', 'lN', 'tN'],
});

const INITIAL_STATE = {
  openMenu: false,
  fN: '',
  lN: '',
  tN: '',
};

const openMenu = (state = INITIAL_STATE, action) => (
  {
    ...state,
    openMenu: action.openMenu,
  }
);

const getMenuData = (state = INITIAL_STATE, action) => (
  {
    ...state,
    fN: action.fN,
    lN: action.lN,
    tN: action.lN,
  }
);

export const HANDLERS = {
  [Types.MENU_ACTION]: openMenu,
  [Types.GET_MENU_DATA]: getMenuData,
};

const menuReducer = createReducer(INITIAL_STATE, HANDLERS);

export default menuReducer;
