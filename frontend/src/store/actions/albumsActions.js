import axiosOrders from "../../axiosOrders";

export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const FETCH_ALBUM_SUCCESS = 'FETCH_ALBUM_SUCCESS';
export const POST_ALBUM_SUCCESS = 'POST_ALBUM_SUCCESS';
export const FETCH_ALL_ALBUMS_SUCCESS = 'FETCH_ALL_ALBUMS_SUCCESS';
export const PUBLISH_ALBUM_SUCCESS = 'PUBLISH_ALBUM_SUCCESS';
export const DELETE_ALBUM_SUCCESS = 'DELETE_ALBUM_SUCCESS';

export const fetchAlbumsSuccess = albums => ({type: FETCH_ALBUMS_SUCCESS, albums});
export const fetchAlbumSuccess = album => ({type: FETCH_ALBUM_SUCCESS, album});
export const postAlbumSuccess = () => ({type: POST_ALBUM_SUCCESS});
export const fetchAllAlbumsSuccess = albums => ({type: FETCH_ALL_ALBUMS_SUCCESS, albums});
export const publishAlbumSuccess = () => ({type: PUBLISH_ALBUM_SUCCESS});
export const deleteAlbumSuccess = () => ({type: DELETE_ALBUM_SUCCESS});

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

export const postAlbum = albumData => {
  return async dispatch => {
    try{
      await axiosOrders.post('/albums', albumData);

      dispatch(postAlbumSuccess());
    }catch(error){
      console.log(error)
    }
  }
};

export const fetchAllAlbums = () => {
  return async dispatch => {
    try{
      const response = await axiosOrders('/albums/all');

      dispatch(fetchAllAlbumsSuccess(response.data));
    }catch(error){
      console.log(error);
    }
  }
};

export const publishAlbum = albumId => {
  return async dispatch => {
    try{
      await axiosOrders.post('/albums/' + albumId + '/publish');

      dispatch(publishAlbumSuccess())
    }catch(error){
      console.log(error);
    }
  }
};

export const deleteAlbum = albumId => {
  return async dispatch => {
    try{
      await axiosOrders.delete('/albums/' + albumId);

      dispatch(deleteAlbumSuccess())
    }catch(error){
      console.log(error);
    }
  }
};