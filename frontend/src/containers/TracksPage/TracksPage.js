import React, {Component} from 'react';
import {fetchAlbum, fetchTracks, postTrackHistory} from "../../store/actions";
import {connect} from "react-redux";
import TrackBlock from "../../components/TrackBlock/TrackBlock";

class TracksPage extends Component {
  async componentDidMount() {
    await this.props.fetchTracks(this.props.match.params.id);
    await this.props.fetchAlbum(this.props.match.params.id);
  }

  postHistory = async trackData => {
    await this.props.postTrackHistory(trackData);
  };

  render() {
    const tracks = this.props.tracks.map(track => (
      <TrackBlock
        key={track._id}
        id={track._id}
        name={track.name}
        duration={track.duration}
        postTrack={this.postHistory}
        show={!!this.props.user}
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
  tracks: state.mainReducer.tracks,
  album: state.mainReducer.album,
  user: state.mainReducer.user,
});

const mapDispatchToProps = dispatch => ({
  fetchTracks: id => dispatch(fetchTracks(id)),
  fetchAlbum: id => dispatch(fetchAlbum(id)),
  postTrackHistory: trackData => dispatch(postTrackHistory(trackData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TracksPage);