import React from 'react';

import './TrackBlock.css';

const TrackBlock = props => {
  return (
    <div className='TrackBlock'>
      <h4>{props.name}</h4>
      <div>
        <button
          onClick={() => props.postTrack({trackId: props.id})}
          style={{
            display: props.show ? 'block' : 'none'
          }}
        >
          Add to history
        </button>
        <h5>{props.duration} seconds</h5>
      </div>
    </div>
  );
};

export default TrackBlock;