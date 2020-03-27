import React from 'react';

import './Layout.css';
import Header from "../Header/Header";

const Layout = props => {
  return (
    <div className='Layout'>
      <Header/>
      {props.children}
    </div>
  );
};

export default Layout;