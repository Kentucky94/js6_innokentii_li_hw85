import axiosOrders from "../../axiosOrders";
import {push} from 'connected-react-router'

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';

export const registerUserRequest = () => ({type: REGISTER_USER_REQUEST});
export const registerUserSuccess = () => ({type: REGISTER_USER_SUCCESS});
export const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, error});

export const loginUserRequest = () => ({type: LOGIN_USER_REQUEST});
export const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
export const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

export const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});

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

export const loginWithFacebook = facebookData => {
  return async dispatch => {
    try{
      const response = await axiosOrders.post('/users/facebook', facebookData);

      dispatch(loginUserSuccess(response.data))
    }catch(e){
      console.log(e);
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

export const logoutUser = () => {
  return async dispatch => {
    try{
      await axiosOrders.delete('/users/sessions');
      dispatch(logoutUserSuccess());
      dispatch(push('/'));
    }catch(error){

    }
  }
};