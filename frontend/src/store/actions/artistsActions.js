import axiosOrders from "../../axiosOrders";
import {push} from 'connected-react-router'

export const FETCH_ARTISTS_SUCCESS = 'FETCH_ARTISTS_SUCCESS';
export const FETCH_ARTIST_SUCCESS = 'FETCH_ARTIST_SUCCESS';
export const POST_ARTIST_SUCCESS = 'POST_ARTIST_SUCCESS';
export const FETCH_ALL_ARTISTS_SUCCESS = 'FETCH_ALL_ARTISTS_SUCCESS';
export const PUBLISH_ARTIST_SUCCESS = 'PUBLISH_ARTIST_SUCCESS';
export const DELETE_ARTIST_SUCCESS = 'DELETE_ARTIST_SUCCESS';

export const fetchArtistsSuccess = artists => ({type: FETCH_ARTISTS_SUCCESS, artists});
export const fetchArtistSuccess = artist => ({type: FETCH_ARTIST_SUCCESS, artist});
export const postArtistSuccess = () => ({type: POST_ARTIST_SUCCESS});
export const fetchAllArtistsSuccess = artists => ({type: FETCH_ALL_ARTISTS_SUCCESS, artists});
export const publishArtistSuccess = () => ({type: PUBLISH_ARTIST_SUCCESS});
export const deleteArtistSuccess = () => ({type: DELETE_ARTIST_SUCCESS});

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

export const postArtist = artistData => {
  return async dispatch => {
    try{
      await axiosOrders.post('/artists', artistData);

      dispatch(postArtistSuccess());
      dispatch(push('/'))
    }catch(error){
      console.log(error);
    }
  }
};

export const fetchAllArtists = () => {
  return async dispatch => {
    try{
      const response = await axiosOrders.get('/artists/all');

      dispatch(fetchAllArtistsSuccess(response.data));
    }catch(error){
      console.log(error);
    }
  }
};

export const publishArtist = artistId => {
  return async dispatch => {
    try{
      await axiosOrders.post('/artists/' + artistId + '/publish');

      dispatch(publishArtistSuccess())
    }catch(error){
      console.log(error);
    }
  }
};

export const deleteArtist = artistId => {
  return async dispatch => {
    try{
      await axiosOrders.delete('/artists/' + artistId);

      dispatch(deleteArtistSuccess())
    }catch(error){
      console.log(error);
    }
  }
};