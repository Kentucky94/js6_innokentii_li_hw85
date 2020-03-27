import {
  FETCH_ALBUM_SUCCESS,
  FETCH_ALBUMS_SUCCESS, FETCH_ALL_ALBUMS_SUCCESS,
} from "../actions/albumsActions";

const initialState = {
  albums: [],
  album: {},
};

const albumsReducer = (state = initialState, action) => {
  switch(action.type){
    case FETCH_ALBUMS_SUCCESS:
      return {...state, albums: action.albums};
    case FETCH_ALBUM_SUCCESS:
      return {...state, album: action.album};
    case FETCH_ALL_ALBUMS_SUCCESS:
      return {...state, albums: action.albums};
    default:
      return state
  }
};

export default albumsReducer;