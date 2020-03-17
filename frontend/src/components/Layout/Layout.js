import React from 'react';
import {NavLink as RouterNavLink} from 'react-router-dom';
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from "reactstrap";

import './Layout.css';

const Layout = props => {
  return (
    <div className='Layout'>
      <div className="Header">
        <Navbar color="light" light expand="md">
          <NavbarBrand tag={RouterNavLink} to="/">My Music App</NavbarBrand>

          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/register" exact>Register</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/login" exact>Log In</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/trackHistories" exact>TrackHistories</NavLink>
            </NavItem>
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