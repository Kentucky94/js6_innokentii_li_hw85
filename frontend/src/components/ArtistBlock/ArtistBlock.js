import React from 'react';

import './ArtistBlock.css'

const ArtistBlock = props => {
  return (
    <div className='ArtistBlock' onClick={() => props.toAlbums(props.id)}>
      <img src={'http://localhost:8080/uploads/' + props.image} alt="artistImg"/>
      <h5>{props.name}</h5>
    </div>
  );
};

export default ArtistBlock;