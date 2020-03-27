import React from 'react';
import './ItemBlock.css';

const ItemBlock = props => {
  return (
    <div className="ItemBlock">
      <h3>{props.title}</h3>
      <div>
        <button className="btn btn-success" onClick={props.onPublish} disabled={props.isPublished}>Publish</button>
        <button className="btn btn-danger" onClick={props.onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ItemBlock;