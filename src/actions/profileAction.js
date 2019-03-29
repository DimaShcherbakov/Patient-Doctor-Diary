import { Creators } from '../reducers/profileReducer';

export const addMessage = newNote => Creators.addMessage(newNote);

export const deleteMessage = id => Creators.deleteMessage(id);
