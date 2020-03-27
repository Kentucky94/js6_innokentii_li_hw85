import React, {Component} from 'react';
import {deleteArtist, fetchAllArtists, publishArtist} from "../../store/actions/artistsActions";
import {deleteAlbum, fetchAllAlbums, publishAlbum} from "../../store/actions/albumsActions";
import {deleteTrack, fetchAllTracks, publishTrack} from "../../store/actions/tracksActions";
import {connect} from "react-redux";
import ItemBlock from "../../components/ItemBlock/ItemBlock";

class AdminPage extends Component {
  async componentDidMount() {
    await this.props.fetchAllArtists();
    await this.props.fetchAllAlbums();
    await this.props.fetchAllTracks();
  }

  render() {
    const artists = this.props.artists.map(artist =>
      <ItemBlock
        key={artist._id}
        title={artist.name}
        isPublished={artist.isPublished}
        onPublish={() => this.props.publishArtist(artist._id)}
        onDelete={() => this.props.deleteArtist(artist._id)}
      />
    );

    const albums = this.props.albums.map(album =>
      <ItemBlock
        key={album._id}
        title={album.title}
        isPublished={album.isPublished}
        onPublish={() => this.props.publishAlbum(album._id)}
        onDelete={() => this.props.deleteAlbum(album._id)}
      />
    );

    const tracks = this.props.tracks.map(track =>
      <ItemBlock
        key={track._id}
        title={track.name}
        isPublished={track.isPublished}
        onPublish={() => this.props.publishTrack(track._id)}
        onDelete={() => this.props.deleteTrack(track._id)}
      />
    );

    return (
      <div>
        <h3>Artists:</h3>
        {artists}
        <h3>Albums:</h3>
        {albums}
        <h3>Tracks:</h3>
        {tracks}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  artists: state.artists.artists,
  albums: state.albums.albums,
  tracks: state.tracks.tracks
});

const mapDispatchToProps = dispatch => ({
  fetchAllArtists: () => dispatch(fetchAllArtists()),
  fetchAllAlbums: () => dispatch(fetchAllAlbums()),
  fetchAllTracks: () => dispatch(fetchAllTracks()),
  publishArtist: (id) => dispatch(publishArtist(id)),
  publishAlbum: (id) => dispatch(publishAlbum(id)),
  publishTrack: (id) => dispatch(publishTrack(id)),
  deleteArtist: (id) => dispatch(deleteArtist(id)),
  deleteAlbum: (id) => dispatch(deleteAlbum(id)),
  deleteTrack: (id) => dispatch(deleteTrack(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);