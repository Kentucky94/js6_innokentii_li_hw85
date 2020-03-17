import React from 'react';
import {NavLink as RouterNavLink} from 'react-router-dom';
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from "reactstrap";
import {useSelector} from "react-redux";

import './Layout.css';

const Layout = props => {
  const user = useSelector(state => state.mainReducer.user);

  return (
    <div className='Layout'>
      <div className="Header">
        <Navbar color="light" light expand="md" className="d-flex flex-grow-1 justify-content-between">
          <NavbarBrand tag={RouterNavLink} to="/">My Music App</NavbarBrand>

          <Nav className="ml-auto" navbar>
            <NavItem style={{display: !user ? 'block' : 'none'}}>
              <NavLink tag={RouterNavLink} to="/register" exact>Register</NavLink>
            </NavItem>
            <NavItem style={{display: !user ? 'block' : 'none'}}>
              <NavLink tag={RouterNavLink} to="/login" exact>Log In</NavLink>
            </NavItem>
            <NavItem style={{display: user ? 'block' : 'none'}}>
              <NavLink tag={RouterNavLink} to="/trackHistories" exact>My TrackHistories</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
      {props.children}
    </div>
  );
};

export default Layout;