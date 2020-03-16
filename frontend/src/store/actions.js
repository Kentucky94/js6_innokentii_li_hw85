import axiosOrders from "../axiosOrders";

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const FETCH_ARTISTS_SUCCESS = 'FETCH_ARTISTS_SUCCESS';
export const FETCH_ARTIST_SUCCESS = 'FETCH_ARTIST_SUCCESS';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const FETCH_ALBUM_SUCCESS = 'FETCH_ALBUM_SUCCESS';
export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';



export const registerUserRequest = () => ({type: REGISTER_USER_REQUEST});
export const registerUserSuccess = () => ({type: REGISTER_USER_SUCCESS});
export const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, error});

export const fetchArtistsSuccess = artists => ({type: FETCH_ARTISTS_SUCCESS, artists});
export const fetchArtistSuccess = artist => ({type: FETCH_ARTIST_SUCCESS, artist});
export const fetchAlbumsSuccess = albums => ({type: FETCH_ALBUMS_SUCCESS, albums});
export const fetchAlbumSuccess = album => ({type: FETCH_ALBUM_SUCCESS, album});
export const fetchTracksSuccess = tracks => ({type: FETCH_TRACKS_SUCCESS, tracks});



export const registerUser = userData => {
  return async dispatch => {
    try{
      dispatch(registerUserRequest());
      await axiosOrders.post('/users', userData);
      dispatch(registerUserSuccess());
    }catch(error){
      if(error.response){
        dispatch(registerUserFailure(error.response.data))
      }else{
        dispatch(registerUserFailure({global: 'No connection'}))
      }
    }
  };
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