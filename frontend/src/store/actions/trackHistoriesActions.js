import axiosOrders from "../../axiosOrders";
import {push} from "connected-react-router";

export const POST_TRACK_HISTORY_SUCCESS = 'POST_TRACK_HISTORY_SUCCESS';
export const POST_TRACK_HISTORY_FAILURE = 'POST_TRACK_HISTORY_FAILURE';
export const FETCH_TRACK_HISTORIES_SUCCESS = 'FETCH_TRACK_HISTORIES_SUCCESS';
export const FETCH_TRACK_HISTORIES_FAILURE = 'FETCH_TRACK_HISTORIES_FAILURE';

export const postTrackHistorySuccess = () => ({type: POST_TRACK_HISTORY_SUCCESS});
export const postTrackHistoryFailure = error => ({type: POST_TRACK_HISTORY_FAILURE, error});
export const fetchTrackHistoriesSuccess = histories => ({type: FETCH_TRACK_HISTORIES_SUCCESS, histories});
export const fetchTrackHistoriesFailure = error => ({type: FETCH_TRACK_HISTORIES_FAILURE, error});

export const postTrackHistory = trackData => {
  return async dispatch => {
    try{
      await axiosOrders.post('/track_history', trackData);

      dispatch(postTrackHistorySuccess())
    }catch(error){
      dispatch(postTrackHistoryFailure(error));
    }
  }
};

export const fetchTrackHistories = () => {
  return async dispatch => {
    try{
      const response = await axiosOrders.get('/track_history');

      response.data.reverse();

      dispatch(fetchTrackHistoriesSuccess(response.data));
    }catch(error){
      dispatch(fetchTrackHistoriesFailure(error));
      dispatch(push('/'))
    }
  };
};