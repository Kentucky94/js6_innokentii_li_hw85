import {
  FETCH_ALBUM_SUCCESS,
  FETCH_ALBUMS_SUCCESS,
  FETCH_ARTIST_SUCCESS,
  FETCH_ARTISTS_SUCCESS,
  FETCH_TRACKS_SUCCESS
} from "./actions";

const initialState = {
  artists: [],
  artist: {},
  albums: [],
  album: {},
  tracks: [],
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case FETCH_ARTISTS_SUCCESS:
      return {...state, artists: action.artists};
    case FETCH_ARTIST_SUCCESS:
      return {...state, artist: action.artist};
    case FETCH_ALBUMS_SUCCESS:
      return {...state, albums: action.albums};
    case FETCH_ALBUM_SUCCESS:
      return {...state, album: action.album};
    case FETCH_TRACKS_SUCCESS:
      return {...state, tracks: action.tracks};
    default:
      return state
  }
};

export default reducer;