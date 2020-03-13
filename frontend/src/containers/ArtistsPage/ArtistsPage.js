import React, {Component} from 'react';
import {fetchArtists} from "../../store/actions";
import {connect} from "react-redux";
import ArtistBlock from "../../components/ArtistBlock/ArtistBlock";

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
        {artists}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  artists: state.artists,
});

const mapDispatchToProps = dispatch => ({
  fetchArtists: () => dispatch(fetchArtists()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsPage);