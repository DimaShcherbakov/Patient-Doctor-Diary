import { Creators } from '../reducers/profileReducer';

export const addMessage = (newNote) => {
  console.log(newNote);
  return Creators.addMessage(newNote);
};

export const deleteMessage = (id) => {
  console.log(id)
  return Creators.deleteMessage(id);
};
