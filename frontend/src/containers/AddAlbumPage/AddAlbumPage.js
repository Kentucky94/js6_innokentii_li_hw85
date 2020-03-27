import React, {Component} from 'react';
import {postAlbum} from "../../store/actions/albumsActions";
import {connect} from "react-redux";
import {Button, Col, Form, FormGroup} from "reactstrap";
import FormElement from "../../components/UI/FormElement/FormElement";
import {fetchArtists} from "../../store/actions/artistsActions";

class AddAlbumPage extends Component {
  state = {
    title: '',
    artist: '',
    release_year: 2000,
    cover_image: '',
  };

  async componentDidMount() {
    await this.props.fetchArtists();
  }

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

    this.props.postAlbum(formData);
  };

  render() {
    const artistsOptions = this.props.artists.map(artist => ({id: artist._id, title: artist.name}));

    return (
      <>
        <Form onSubmit={this.onSubmitHandler}>
          <FormElement
            propertyName="title"
            title="Album Title"
            type="text"
            onChange={this.inputChangeHandler}
            value={this.state.title}
            required
          />
          <FormElement
            propertyName="artist"
            title="Album Artist"
            type="select"
            options={artistsOptions}
            onChange={this.inputChangeHandler}
            value={this.state.artist}
            required
          />
          <FormElement
            propertyName="release_year"
            title="Release Year"
            type="number"
            onChange={this.inputChangeHandler}
            value={this.state.release_year}
            required
          />
          <FormElement
            propertyName="cover_image"
            title="Album Cover"
            type="file"
            onChange={this.fileChangeHandler}
            required
          />
          <FormGroup row>
            <Col sm={{offset:2, size: 10}}>
              <Button type="submit" color="primary">Add an album</Button>
            </Col>
          </FormGroup>
        </Form>
      </>
    );
  }
}

const mapStateToProps = state => ({
  artists: state.artists.artists,
});

const mapDispatchToProps = dispatch => ({
  fetchArtists: () => dispatch(fetchArtists()),
  postAlbum: albumData => dispatch(postAlbum(albumData))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAlbumPage);