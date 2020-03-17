import React from 'react';
import {NavLink as RouterNavLink} from 'react-router-dom';
import {Nav, Navbar, NavbarBrand} from "reactstrap";

import './Layout.css';

const Layout = props => {
  return (
    <div className='Layout'>
      <div className="Header">
        <Navbar color="light" light expand="md">
          <NavbarBrand tag={RouterNavLink} to="/">My Music App</NavbarBrand>

          <Nav className="ml-auto" navbar>
            {/*{user ? (*/}
            {/*  <UserMenu user={user} />*/}
            {/*) : (*/}
            {/*  <AnonymousMenu/>*/}
            {/*)}*/}
          </Nav>
        </Navbar>
      </div>
      {props.children}
    </div>
  );
};

export default Layout;