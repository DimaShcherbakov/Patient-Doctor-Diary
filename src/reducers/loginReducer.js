const initialState = {
  token: '',
  isAuthorised: false,
};

const loginReducer = (state = initialState, action) => {
  switch ( action.type ) {
    case 'LOGIN_SUCCESS':
      state = {
        ...state,
        token: action.payload.token,
        isAuthorised: action.payload.isAuthorised,
      };
    break;
    case 'LOGIN_FAILURE':
      state = {
        ...state,
        isAuthorised: action.payload.isAuthorised,
      };
    break;
  };
  return state;
};

export default loginReducer;