import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  menuAction: ['openMenu'],
  getMenuData: ['data'],
  getPatientData: ['data'],
});

const INITIAL_STATE = {
  openMenu: false,
  fN: '',
  lN: '',
  tN: '',
  em: '',
  pos: '',
  tel: '',
  bday: '',
  workPlace: '',
  regPlace: '',
};

const openMenu = (state = INITIAL_STATE, action) => (
  {
    ...state,
    openMenu: action.openMenu,
  }
);

const getMenuData = (state = INITIAL_STATE, action) => {
  const {
    bDay, email, phone, firstName, lastName, pos, thirdName, photo,
  } = action.data;
  return {
    ...state,
    photo,
    fN: firstName,
    lN: lastName,
    tN: thirdName,
    em: email,
    pos,
    tel: phone,
    bday: bDay,
  };
};

const getPatientData = (state = INITIAL_STATE, action) => {
  const {
    bDay, email, phone, firstName, lastName, workPlace, regPlace, thirdName, photo,
  } = action.data;
  return {
    ...state,
    photo,
    fN: firstName,
    lN: lastName,
    tN: thirdName,
    em: email,
    workPlace,
    regPlace,
    tel: phone,
    bday: bDay,
  };
};
export const HANDLERS = {
  [Types.MENU_ACTION]: openMenu,
  [Types.GET_MENU_DATA]: getMenuData,
  [Types.GET_PATIENT_DATA]: getPatientData,
};

const menuReducer = createReducer(INITIAL_STATE, HANDLERS);

export default menuReducer;
