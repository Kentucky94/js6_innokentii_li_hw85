import React, {Component} from 'react';
import {fetchAlbum, fetchTracks} from "../../store/actions";
import {connect} from "react-redux";
import TrackBlock from "../../components/TrackBlock/TrackBlock";

class TracksPage extends Component {
  async componentDidMount() {
    await this.props.fetchTracks(this.props.match.params.id);
    await this.props.fetchAlbum(this.props.match.params.id);
  }

  render() {
    const tracks = this.props.tracks.map(track => (
      <TrackBlock
        key={track._id}
        name={track.name}
        duration={track.duration}
      />
    ));

    return (
      <div>
        <h2>{this.props.album.title}</h2>
        {tracks}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tracks: state.tracks,
  album: state.album,
});

const mapDispatchToProps = dispatch => ({
  fetchTracks: id => dispatch(fetchTracks(id)),
  fetchAlbum: id => dispatch(fetchAlbum(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TracksPage);