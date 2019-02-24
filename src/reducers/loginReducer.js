import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  loginSuccess: ['token', 'userId'],
  loginFailure: [''],
  logout: [''],
});

const INITIAL_STATE = {
  token: '',
  userId: '',
  isAuthorised: false,
  error: false,
};

const success = (state = INITIAL_STATE, action) => (
  {
    ...state,
    token: action.token,
    userId: action.userId,
    isAuthorised: true,
  }
);

const failure = (state = INITIAL_STATE, action) => (
  {
    ...state,
    isAuthorised: false,
    error: true,
  }
);

const logout = (state = INITIAL_STATE, action) => (
  {
    ...state,
    token: '',
    userId: '',
    isAuthorised: false,
  }
);


export const HANDLERS = {
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout,
};

const loginReducer = createReducer(INITIAL_STATE, HANDLERS);

export default loginReducer;
