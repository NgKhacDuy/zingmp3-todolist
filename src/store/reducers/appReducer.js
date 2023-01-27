import actionTypes from "../actions/actionTypes";
const initState = {
    homeData: [],
    test: 123
}
const appReducer = (state = initState, action) => {
    switch(action.type){
        case actionTypes.GET_HOME:
            return state
            break;
        default:
            return state
            break;
    }
    
}

export default appReducer