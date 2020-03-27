import React, {Component} from 'react';
import {connect} from "react-redux";

import {fetchAlbumsByArtist} from "../../store/actions/albumsActions";
import {fetchArtist} from "../../store/actions/artistsActions";
import AlbumBlock from "../../components/AlbumBlock/AlbumBlock";
import './AlbumsPage.css';

class AlbumsPage extends Component {
  async componentDidMount() {
    await this.props.fetchAlbumsByArtist(this.props.match.params.id);
    await this.props.fetchArtist(this.props.match.params.id);
  }

  toTracks = id => {
    this.props.history.push('/tracks/' + id);
  };

  render() {
    const albums = this.props.albums.map(album => (
      <AlbumBlock
        key={album._id}
        id={album._id}
        release_year={album.release_year}
        title={album.title}
        image={album.cover_image}
        toTracks={this.toTracks}
      />
    ));

    return (
      <div>
        <h2>{this.props.artist.name}</h2>
        <div className="AlbumsBlocks">
          {albums}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  albums: state.albums.albums,
  artist: state.artists.artist,
});

const mapDispatchToProps = dispatch => ({
  fetchAlbumsByArtist: id => dispatch(fetchAlbumsByArtist(id)),
  fetchArtist: id => dispatch(fetchArtist(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsPage);