import actionTypes from "../actions/actionTypes";
const initState = {
  curSongId: null,
  isPlaying: false,
};
const musicReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_CUR_SONG_ID:
      return {
        ...state,
        curSongId: action.sid || null,
      };

    case actionTypes.PLAY:
      return {
        ...state,
        isPlaying: action.flag,
      };
    // break;
    default:
      return state;
      break;
  }
};

export default musicReducer;
