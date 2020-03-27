import {
  FETCH_TRACKS_SUCCESS,
  FETCH_ALL_TRACKS_SUCCESS
} from "../actions/tracksActions";

const initialState = {
  tracks: [],
  trackHistories: [],
};

const tracksReducer = (state = initialState, action) => {
  switch(action.type){
    case FETCH_TRACKS_SUCCESS:
      return {...state, tracks: action.tracks};
    case FETCH_ALL_TRACKS_SUCCESS:
      return {...state, tracks: action.tracks};
    default:
      return state
  }
};

export default tracksReducer;