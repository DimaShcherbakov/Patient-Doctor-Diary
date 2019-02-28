const INITIAL_STATE =  [] ;

const profileReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case "ADD_ROW": 
        return  state.concat(action.formData)
        default: 
        return state
    }
} 
export default profileReducer