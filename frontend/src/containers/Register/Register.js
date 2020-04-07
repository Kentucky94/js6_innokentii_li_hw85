import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Col, Form, FormGroup} from "reactstrap";

import {registerUser} from "../../store/actions/usersActions";
import FormElement from "../../components/UI/FormElement/FormElement";

class Register extends Component {
  state = {
    username: '',
    password: '',
    displayName: '',
    avatarImage: '',
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  fileChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.files[0]
    })
  };

  onSubmitHandler = event => {
    event.preventDefault();

    const formData = new FormData();

    Object.keys(this.state).forEach(key => {
      const value = this.state[key];

      formData.append(key, value);
    });

    this.props.registerUser(formData);
  };

  getFieldError = fieldName => {
    try{
      return this.props.registerError.errors[fieldName].message;
    }catch(error){
      return undefined;
    }
  };

  render() {
    return (
      <>
        <h2>Register new user</h2>
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
          <FormElement
            propertyName="displayName"
            title="Display Name"
            type="text"
            value={this.state.displayName}
            onChange={this.inputChangeHandler}
            required
          />
          <FormElement
            propertyName="avatarImage"
            title="Avatar Image"
            type="file"
            onChange={this.fileChangeHandler}
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
  registerError: state.users.registerError,
});

const mapDispatchToProps = dispatch => ({
  registerUser: userData => dispatch(registerUser(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);