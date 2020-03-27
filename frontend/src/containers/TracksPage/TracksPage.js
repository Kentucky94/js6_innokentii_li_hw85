import React, {Component} from 'react';
import {connect} from "react-redux";
import TrackBlock from "../../components/TrackBlock/TrackBlock";
import {fetchTracks} from "../../store/actions/tracksActions";
import {fetchAlbum} from "../../store/actions/albumsActions";
import {postTrackHistory} from "../../store/actions/trackHistoriesActions";

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
  tracks: state.tracks.tracks,
  album: state.albums.album,
  user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
  fetchTracks: id => dispatch(fetchTracks(id)),
  fetchAlbum: id => dispatch(fetchAlbum(id)),
  postTrackHistory: trackData => dispatch(postTrackHistory(trackData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TracksPage);