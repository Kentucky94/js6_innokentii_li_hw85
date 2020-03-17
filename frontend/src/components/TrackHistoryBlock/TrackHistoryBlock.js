import React from 'react';
import moment from 'moment';

import './TrackHistoryBlock.css';

const TrackHistoryBlock = props => {
  return (
    <div className="TrackHistoryBlock">
      <p><b>Title:</b> {props.trackName}</p>
      <p><b>By:</b> {props.artist}</p>
      <p><b>Last listened on:</b> {moment(props.datetime).format('MMMM Do YYYY, h:mm:ss a')}</p>
    </div>
  );
};

export default TrackHistoryBlock;