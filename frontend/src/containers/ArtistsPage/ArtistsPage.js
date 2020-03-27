import React, {Component} from 'react';
import {connect} from "react-redux";

import {fetchArtists} from "../../store/actions/artistsActions";
import ArtistBlock from "../../components/ArtistBlock/ArtistBlock";
import './ArtistsPage.css'


class ArtistsPage extends Component {
  async componentDidMount() {
    await this.props.fetchArtists();
  }

  toAlbums = id => {
    this.props.history.push('/albums/' + id);
  };

  render() {
    const artists = this.props.artists.map(artist => (
        <ArtistBlock
          key={artist._id}
          id={artist._id}
          name={artist.name}
          image={artist.photo}
          toAlbums={this.toAlbums}
        />
      )
    );

    return (
      <div>
        <h2>My Artists</h2>
        <div className="ArtistsBlocks">
          {artists}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  artists: state.artists.artists,
});

const mapDispatchToProps = dispatch => ({
  fetchArtists: () => dispatch(fetchArtists()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsPage);