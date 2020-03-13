import React from 'react';

import './TrackBlock.css';

const TrackBlock = props => {
  return (
    <div className='TrackBlock'>
      <h4>{props.name}</h4>
      <h5>{props.duration} seconds</h5>
    </div>
  );
};

export default TrackBlock;