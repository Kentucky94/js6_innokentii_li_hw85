import React, {Component} from 'react';
import {Button, Col, Form, FormGroup} from "reactstrap";
import {connect} from "react-redux";

import {loginUser} from "../../store/actions/usersActions";
import FormElement from "../../components/UI/FormElement/FormElement";

class Login extends Component {
  state={
    username: '',
    password: '',
  };

  inputChangeHandler = event => {
    this.setState({[event.target.name]: event.target.value})
  };

  onSubmitHandler = event => {
    event.preventDefault();

    this.props.loginUser({...this.state});
  };

  getFieldError = fieldName => {
    try{
      return this.props.loginError.errors[fieldName].message;
    }catch(error){
      return undefined;
    }
  };

  render() {
    return (
      <>
        <h2>Login user</h2>
        <Form onSubmit={this.onSubmitHandler}>
          <FormElement
            propertyName="username"
            title="Username"
            type="text"
            value={this.state.username}
            error={this.getFieldError('username')}
            onChange={this.inputChangeHandler}
            required
          />
          <FormElement
            propertyName="password"
            title="Password"
            type="password"
            value={this.state.password}
            error={this.getFieldError('password')}
            onChange={this.inputChangeHandler}
            required
          />
          <FormGroup row>
            <Col sm={{offset: 2, size: 10}}>
              <Button
                type="submit"
                color="primary"
              >
                Register
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user,
  loginLoading: state.users.loginLoading,
  loginError: state.users.loginError,
});

const mapDispatchToProps = dispatch => ({
  loginUser: userData => dispatch(loginUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);