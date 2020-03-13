import React, {Component} from 'react';
import {fetchTracks} from "../../store/actions";
import {connect} from "react-redux";
import TrackBlock from "../../components/TrackBlock/TrackBlock";

class TracksPage extends Component {
  async componentDidMount() {
    await this.props.fetchTracks(this.props.match.params.id);
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
        {tracks}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tracks: state.tracks,
});

const mapDispatchToProps = dispatch => ({
  fetchTracks: id => dispatch(fetchTracks(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TracksPage);