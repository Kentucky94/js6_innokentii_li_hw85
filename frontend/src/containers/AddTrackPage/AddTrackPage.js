import React, {Component} from 'react';
import {postTrack} from "../../store/actions/tracksActions";
import {connect} from "react-redux";
import {Button, Col, Form, FormGroup} from "reactstrap";
import FormElement from "../../components/UI/FormElement/FormElement";
import {fetchAlbums} from "../../store/actions/albumsActions";

class AddTrackPage extends Component {
  state = {
    name: '',
    album: '',
    track_number: 0,
    duration: 0,
  };

  async componentDidMount() {
    await this.props.fetchAlbums();
  }

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  };

  onSubmitHandler = event => {
    event.preventDefault();

    this.props.postTrack({...this.state});
  };

  render() {
    const albumsOptions = this.props.albums.map(album => ({id: album._id, title: album.title}));

    return (
      <>
        <Form onSubmit={this.onSubmitHandler}>
          <FormElement
            propertyName="name"
            title="Track Name"
            type="text"
            onChange={this.inputChangeHandler}
            value={this.state.name}
            required
          />
          <FormElement
            propertyName="album"
            title="Track Album"
            type="select"
            options={albumsOptions}
            onChange={this.inputChangeHandler}
            value={this.state.album}
          />
          <FormElement
            propertyName="track_number"
            title="Track Number"
            type="number"
            onChange={this.inputChangeHandler}
            value={this.state.track_number}
          />
          <FormElement
            propertyName="duration"
            title="Track Length"
            type="number"
            onChange={this.inputChangeHandler}
            value={this.state.duration}
          />
          <FormGroup row>
            <Col sm={{offset:2, size: 10}}>
              <Button type="submit" color="primary">Add new track</Button>
            </Col>
          </FormGroup>
        </Form>
      </>
    );
  }
}

const mapStateToProps = state => ({
  albums: state.albums.albums,
});

const mapDispatchToProps = dispatch => ({
  fetchAlbums: () => dispatch(fetchAlbums()),
  postTrack: trackData => dispatch(postTrack(trackData))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTrackPage);