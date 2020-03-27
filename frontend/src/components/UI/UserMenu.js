import React from 'react';
import {Button, NavItem, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const UserMenu = props => {
  return (
    <>
      <NavItem>
        <NavLink tag={RouterNavLink} to="/artists/add">Add Artist</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={RouterNavLink} to="/albums/add">Add Album</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={RouterNavLink} to="/tracks/add">Add Track</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={RouterNavLink} to="/trackHistories" exact>My TrackHistories</NavLink>
      </NavItem>
      <NavItem>
        <Button onClick={props.onClick} className="btn btn-danger">Logout</Button>
      </NavItem>
    </>
  );
};

export default UserMenu;