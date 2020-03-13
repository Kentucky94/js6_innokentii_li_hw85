import React, {Component} from 'react';
import {fetchAlbums} from "../../store/actions";
import {connect} from "react-redux";
import AlbumBlock from "../../components/AlbumBlock/AlbumBlock";

class AlbumsPage extends Component {
  async componentDidMount() {
    await this.props.fetchAlbums(this.props.match.params.id);
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
        {albums}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  albums: state.albums,
});

const mapDispatchToProps = dispatch => ({
  fetchAlbums: id => dispatch(fetchAlbums(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsPage);