import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Col, Form, FormGroup} from "reactstrap";

import {registerUser} from "../../store/actions";
import FormElement from "../../components/UI/FormElement/FormElement";

class Register extends Component {
  state = {
    username: '',
    password: '',
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmitHandler = event => {
    event.preventDefault();

    this.props.registerUser({...this.state});
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
  registerError: state.registerError,
});

const mapDispatchToProps = dispatch => ({
  registerUser: userData => dispatch(registerUser(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);