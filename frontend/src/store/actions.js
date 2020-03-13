import axiosOrders from "../axiosOrders";

export const FETCH_ARTISTS_SUCCESS = 'FETCH_ARTISTS_SUCCESS';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';

export const fetchArtistsSuccess = artists => ({type: FETCH_ARTISTS_SUCCESS, artists});
export const fetchAlbumsSuccess = albums => ({type: FETCH_ALBUMS_SUCCESS, albums});
export const fetchTracksSuccess = tracks => ({type: FETCH_TRACKS_SUCCESS, tracks});

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