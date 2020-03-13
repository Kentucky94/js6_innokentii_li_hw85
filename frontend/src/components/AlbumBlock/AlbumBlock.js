import React from 'react';

import './AlbumBlock.css';

const AlbumBlock = props => {
  return (
    <div className='AlbumBlock' onClick={() => props.toTracks(props.id)}>
      <img src={'http://localhost:8080/uploads/' + props.image} alt="albumImg"/>
      <h5>{props.title}</h5>
      <h5>{props.release_year}</h5>
    </div>
  );
};

export default AlbumBlock;