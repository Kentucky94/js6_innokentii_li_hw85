import {
  FETCH_ALBUM_SUCCESS,
  FETCH_ALBUMS_SUCCESS,
  FETCH_ARTIST_SUCCESS,
  FETCH_ARTISTS_SUCCESS,
  FETCH_TRACKS_SUCCESS, LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS
} from "./actions";

const initialState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  artists: [],
  artist: {},
  albums: [],
  album: {},
  tracks: [],
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case REGISTER_USER_REQUEST:
      return {...state, registerLoading: true};
    case REGISTER_USER_SUCCESS:
      return {...state, registerLoading: false, registerError: null};
    case REGISTER_USER_FAILURE:
      return {...state, registerLoading: false, registerError: action.error};
    case LOGIN_USER_REQUEST:
      return {...state, loginLoading: true};
    case LOGIN_USER_SUCCESS:
      return {...state, user: action.user, loginLoading: false, loginError: null};
    case LOGIN_USER_FAILURE:
      return {...state, loginLoading: false, loginError: action.error};
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