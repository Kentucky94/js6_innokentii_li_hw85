import axiosOrders from "../axiosOrders";
import {push} from 'connected-react-router'

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const FETCH_ARTISTS_SUCCESS = 'FETCH_ARTISTS_SUCCESS';
export const FETCH_ARTIST_SUCCESS = 'FETCH_ARTIST_SUCCESS';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const FETCH_ALBUM_SUCCESS = 'FETCH_ALBUM_SUCCESS';
export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';

export const POST_TRACK_HISTORY_SUCCESS = 'POST_TRACK_HISTORY_SUCCESS';
export const POST_TRACK_HISTORY_FAILURE = 'POST_TRACK_HISTORY_FAILURE';
export const FETCH_TRACK_HISTORIES_SUCCESS = 'FETCH_TRACK_HISTORIES_SUCCESS';
export const FETCH_TRACK_HISTORIES_FAILURE = 'FETCH_TRACK_HISTORIES_FAILURE';


export const registerUserRequest = () => ({type: REGISTER_USER_REQUEST});
export const registerUserSuccess = () => ({type: REGISTER_USER_SUCCESS});
export const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, error});
export const loginUserRequest = () => ({type: LOGIN_USER_REQUEST});
export const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
export const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

export const fetchArtistsSuccess = artists => ({type: FETCH_ARTISTS_SUCCESS, artists});
export const fetchArtistSuccess = artist => ({type: FETCH_ARTIST_SUCCESS, artist});
export const fetchAlbumsSuccess = albums => ({type: FETCH_ALBUMS_SUCCESS, albums});
export const fetchAlbumSuccess = album => ({type: FETCH_ALBUM_SUCCESS, album});
export const fetchTracksSuccess = tracks => ({type: FETCH_TRACKS_SUCCESS, tracks});

export const postTrackHistorySuccess = () => ({type: POST_TRACK_HISTORY_SUCCESS});
export const postTrackHistoryFailure = error => ({type: POST_TRACK_HISTORY_FAILURE, error});
export const fetchTrackHistoriesSuccess = histories => ({type: FETCH_TRACK_HISTORIES_SUCCESS, histories});
export const fetchTrackHistoriesFailure = error => ({type: FETCH_TRACK_HISTORIES_FAILURE, error});



export const postTrackHistory = trackData => {
  return async (dispatch, getState) => {
    try{
      const user = getState().mainReducer.user;

      await axiosOrders.post('/track_history', trackData, {headers: {'Authorization': 'Token ' + user.token}});

      dispatch(postTrackHistorySuccess())
    }catch(error){
      dispatch(postTrackHistoryFailure(error));
    }
  }
};

export const fetchTrackHistories = () => {
  return async (dispatch, getState) => {
    try{
      const user = getState().mainReducer.user;

      const response = await axiosOrders.get('/track_history', {headers: {'Authorization': 'Token ' + user.token}});

      response.data.reverse();

      dispatch(fetchTrackHistoriesSuccess(response.data));
    }catch(error){
      dispatch(fetchTrackHistoriesFailure(error));
      dispatch(push('/'))
    }
  };
};

export const registerUser = userData => {
  return async dispatch => {
    try{
      dispatch(registerUserRequest());
      await axiosOrders.post('/users', userData);
      dispatch(registerUserSuccess());
      dispatch(push('/'))
    }catch(error){
      if(error.response){
        dispatch(registerUserFailure(error.response.data))
      }else{
        dispatch(registerUserFailure({global: 'No connection'}))
      }
    }
  };
};

export const loginUser = userData => {
  return async dispatch => {
    try{
      dispatch(loginUserRequest());
      const response = await axiosOrders.post('/users/sessions', userData);
      dispatch(loginUserSuccess(response.data));
      dispatch(push('/'))
    }catch(error){
      if (error.response) {
        dispatch(loginUserFailure(error.response.data));
      } else {
        dispatch(loginUserFailure({global: 'Network error or no internet'}));
      }
    }
  }
};

export const fetchArtists = () => {
  return async dispatch => {
    try{
      const response = await axiosOrders.get('/artists');

      dispatch(fetchArtistsSuccess(response.data));
    }catch(error){
      console.log(error);
    }
  }
};

export const fetchArtist = artistId => {
  return async dispatch => {
    try{
      const response = await axiosOrders.get('/artists/' + artistId);

      dispatch(fetchArtistSuccess(response.data))
    }catch(error){
      console.log(error);
    }
  }
};

export const fetchAlbums = artistId => {
  return async dispatch => {
    try{
      const response = await axiosOrders('/albums/byArtist/' + artistId);

      dispatch(fetchAlbumsSuccess(response.data));
    }catch(error){
      console.log(error);
    }
  }
};

export const fetchAlbum = albumId => {
  return async dispatch => {
    try{
      const response = await axiosOrders.get('/albums/' + albumId);

      dispatch(fetchAlbumSuccess(response.data))
    }catch(error){
      console.log(error);
    }
  };
};

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