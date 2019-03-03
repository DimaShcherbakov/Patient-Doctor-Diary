import { Creators } from '../reducers/profileReducer';

const addMessage = newNote => (Creators.addMessage(newNote));

export default addMessage;
