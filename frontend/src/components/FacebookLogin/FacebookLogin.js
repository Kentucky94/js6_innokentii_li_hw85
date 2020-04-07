import React from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props'
import {Button} from "reactstrap";
import {useDispatch} from "react-redux";
import {loginWithFacebook} from "../../store/actions/usersActions";


const FacebookLogin = () => {
  const dispatch = useDispatch();

  const responseFacebook = async event => {
    event.avatar = event.picture.data.url;
    console.log(event);
    dispatch(loginWithFacebook(event));
  };

  return (
    <FacebookLoginButton
      appId="262652934739222"
      callback={responseFacebook}
      size='small'
      fields='name,email,picture'
      icon={true}
      render={renderProps => (
        <Button className='btn btn-success my-2' onClick={renderProps.onClick}>Register with Facebook</Button>
      )}
    />
  );
};

export default FacebookLogin;