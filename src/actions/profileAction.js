import { Creators } from '../reducers/profileReducer';

console.log(Creators)
export const addMessage = newNote => (Creators.addMessage(newNote));
export const deleteMessage = id => (Creators.deleteMessage(id));
