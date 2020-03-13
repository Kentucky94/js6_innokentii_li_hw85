import React from 'react';

import './Layout.css';

const Layout = props => {
  return (
    <div className='Layout'>
      <div className="Header">
        <h3>
          My Music App
        </h3>
        <div/>
      </div>
      {props.children}
    </div>
  );
};

export default Layout;