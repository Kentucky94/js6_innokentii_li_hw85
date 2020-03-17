import React, {Component} from 'react';
import {Button, Col, Form, FormGroup} from "reactstrap";
import FormElement from "../../components/UI/FormElement/FormElement";
import {loginUser} from "../../store/actions";
import {connect} from "react-redux";

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
            type="text"
            value={this.state.username}
            error={this.getFieldError('username')}
            onChange={this.inputChangeHandler}
            required
          />
          <FormElement
            propertyName="password"
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
  user: state.mainReducer.user,
  loginLoading: state.mainReducer.loginLoading,
  loginError: state.mainReducer.loginError,
});

const mapDispatchToProps = dispatch => ({
  loginUser: userData => dispatch(loginUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);