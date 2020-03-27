import axiosOrders from "../../axiosOrders";
import {push} from 'connected-react-router';

export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const POST_TRACKS_SUCCESS = 'POST_TRACKS_SUCCESS';
export const FETCH_ALL_TRACKS_SUCCESS = 'FETCH_ALL_TRACKS_SUCCESS';
export const PUBLISH_TRACK_SUCCESS = 'PUBLISH_TRACK_SUCCESS';
export const DELETE_TRACK_SUCCESS = 'DELETE_TRACK_SUCCESS';

export const fetchTracksSuccess = tracks => ({type: FETCH_TRACKS_SUCCESS, tracks});
export const postTrackSuccess = () => ({type: POST_TRACKS_SUCCESS});
export const fetchAllTracksSuccess = tracks => ({type: FETCH_ALL_TRACKS_SUCCESS, tracks});
export const publishTrackSuccess = () => ({type: PUBLISH_TRACK_SUCCESS});
export const deleteTrackSuccess = () => ({type: DELETE_TRACK_SUCCESS});

export const fetchTracks = albumId => {
  return async dispatch => {
    try{
      const response = await axiosOrders.get('/tracks/byAlbum/' + albumId);

      dispatch(fetchTracksSuccess(response.data));
    }catch(error){
      console.log(error);
    }
  }
};

export const postTrack = trackData => {
  return async dispatch => {
    try{
      await axiosOrders.post('/tracks', trackData);

      dispatch(postTrackSuccess());
      dispatch(push('/'))
    }catch(error){
      console.log(error);
    }
  }
};

export const fetchAllTracks = () => {
  return async dispatch => {
    try{
      const response = await axiosOrders.get('/tracks/all');

      dispatch(fetchAllTracksSuccess(response.data));
    }catch(error){
      console.log(error);
    }
  }
};

export const publishTrack = trackId => {
  return async dispatch => {
    try{
      await axiosOrders.post('/tracks/' + trackId + '/publish');

      dispatch(publishTrackSuccess());
      dispatch(fetchAllTracks());
    }catch(error){
      console.log(error);
    }
  }
};

export const deleteTrack = trackId => {
  return async dispatch => {
    try{
      await axiosOrders.delete('/tracks/' + trackId);

      dispatch(deleteTrackSuccess());
      dispatch(fetchAllTracks());
    }catch(error){
      console.log(error);
    }
  }
};