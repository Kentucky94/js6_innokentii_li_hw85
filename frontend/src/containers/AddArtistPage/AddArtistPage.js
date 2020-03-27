import React, {Component} from 'react';
import {postArtist} from "../../store/actions/artistsActions";
import {connect} from "react-redux";
import {Button, Col, Form, FormGroup} from "reactstrap";
import FormElement from "../../components/UI/FormElement/FormElement";

class AddArtistPage extends Component {
  state = {
    name: '',
    info: '',
    photo: '',
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  };

  fileChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.files[0],
    })
  };

  onSubmitHandler = event => {
    event.preventDefault();

    const formData = new FormData();

    Object.keys(this.state).forEach(key => {
      const value = this.state[key];

      formData.append(key, value);
    });

    this.props.postArtist(formData);
  };

  render() {
    return (
      <>
        <Form onSubmit={this.onSubmitHandler}>
          <FormElement
            propertyName="name"
            title="Artist Name"
            type="text"
            onChange={this.inputChangeHandler}
            value={this.state.name}
            required
          />
          <FormElement
            propertyName="info"
            title="Artist Info"
            type="text"
            onChange={this.inputChangeHandler}
            value={this.state.info}
          />
          <FormElement
            propertyName="photo"
            title="Artist Photo"
            type="file"
            onChange={this.fileChangeHandler}
            required
          />
          <FormGroup row>
            <Col sm={{offset:2, size: 10}}>
              <Button type="submit" color="primary">Add an artist</Button>
            </Col>
          </FormGroup>
        </Form>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  postArtist: artistData => dispatch(postArtist(artistData))
});

export default connect(null, mapDispatchToProps)(AddArtistPage);