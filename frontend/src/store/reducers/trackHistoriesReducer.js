import {
  FETCH_TRACK_HISTORIES_SUCCESS
} from "../actions/trackHistoriesActions";

const initialState = {
  trackHistories: [],
};

const trackHistoriesReducer = (state = initialState, action) => {
  switch(action.type){
    case FETCH_TRACK_HISTORIES_SUCCESS:
      return {...state, trackHistories: action.histories};
    default:
      return state
  }
};

export default trackHistoriesReducer;