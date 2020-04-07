import React from 'react';
import {Button, NavItem, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const UserMenu = props => {
  return (
    <div className='d-flex align-items-center'>
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
      <div className='px-3 py-0'>
        <h5 style={{'display': 'inline-block'}}>
          Hello, {props.user.displayName}!
        </h5>
        <img
          style={{
            'width': '50px',
            'display': 'inline-block',
            'margin': '0 10px'
          }}
          src={props.user.avatarImage ? props.user.avatarImage : 'http://localhost:8080/uploads/avatar/noAvatar.jpeg'}
          alt="userImg"
        />
      </div>
      <NavItem>
        <Button onClick={props.onClick} className="btn btn-danger">Logout</Button>
      </NavItem>
    </div>
  );
};

export default UserMenu;