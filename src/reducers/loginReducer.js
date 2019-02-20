const initialState = {
  token: '',
  userId: '',
  isAuthorised: false,
  error: false,
};

const loginReducer = (state = initialState, action) => {
  console.log(localStorage)
  switch ( action.type ) {
    case 'LOGIN_SUCCESS':
      state = {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        isAuthorised: action.payload.isAuthorised,
      };
    break;
    case 'LOGIN_FAILURE':
      state = {
        ...state,
        isAuthorised: action.payload.isAuthorised,
        error: action.payload.error,
      };
      console.log(state)
    break;
    case 'LOGOUT':
      state = {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        isAuthorised: action.payload.isAuthorised,
      }
      console.log(state);
    break;
  };
  return state;
};

export default loginReducer;
