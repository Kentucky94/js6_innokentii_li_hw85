import React from 'react';
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import './Header.css'
import {logoutUser} from "../../store/actions/usersActions";
import AnonMenu from "../UI/AnonMenu";
import UserMenu from "../UI/UserMenu";

const Header = () => {
  const user = useSelector(state => state.users.user);
  const dispatch = useDispatch();

  return (
    <div className="Header">
      <Navbar color="light" light expand="md" className="d-flex flex-grow-1 justify-content-between">
        <NavbarBrand tag={RouterNavLink} to="/">My Music App</NavbarBrand>

        <Nav className="ml-auto" navbar>
          {!!user && user.role === 'admin' ?
            <NavItem>
              <NavLink tag={RouterNavLink} to="/admin/list">To Admin List</NavLink>
            </NavItem> : null}
          {!user ?
            <AnonMenu/> :
            <UserMenu user={user} onClick={() => dispatch(logoutUser())}/>
          }
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;