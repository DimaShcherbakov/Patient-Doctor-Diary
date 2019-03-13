import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  addMessage: ['newNote'],
});

const INITIAL_STATE = {
  notes: [],
};

const addMessage = (state = INITIAL_STATE, action) => (
  {
    ...state,
    notes: [...state.notes, action.newNote],
  }
);

export const HANDLERS = {
  [Types.ADD_MESSAGE]: addMessage,
};

const profileReducer = createReducer(INITIAL_STATE, HANDLERS);

// import search from '../utils/findIndex';
// const INITIAL_STATE = [];

// const profileReducer = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case 'ADD_ROW':
   
//       return [...state, action];
//     case 'DELETE_ROW':
      
//         state.splice(search(state, action.id), 1);
//     return [...state]
//     default:
//       return [...state];
//   }
// };
export default profileReducer;
