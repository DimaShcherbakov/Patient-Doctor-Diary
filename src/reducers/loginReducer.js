const initialState = {
  token: '',
  userId: '',
  isAuthorised: false,
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
    console.log("ERROR")
      state = {
        ...state,
        isAuthorised: action.payload.isAuthorised,
      };
    break;
  };
  return state;
};

export default loginReducer;
