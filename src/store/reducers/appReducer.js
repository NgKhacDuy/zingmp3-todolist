import actionTypes from "../actions/actionTypes";
const initState = {
    banner: [],

}
const appReducer = (state = initState, action) => {
    switch(action.type){
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionType === 'banner')?.items || null
            }
            break;
        default:
            return state
            break;
    }
    
}

export default appReducer