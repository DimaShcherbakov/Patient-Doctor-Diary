import search from '../utils/findIndex';
const INITIAL_STATE = [];

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_ROW':
   
      return [...state, action];
    case 'DELETE_ROW':
      
        state.splice(search(state, action.id), 1);
    return [...state]
    default:
      return [...state];
  }
};
export default profileReducer;
