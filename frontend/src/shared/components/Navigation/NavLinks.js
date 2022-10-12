import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {
  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact>All Users</NavLink>
    </li>
    <li>
      <NavLink to="/u1/places">My Resumes</NavLink>
    </li>
    <li>
      <NavLink to="/places/new">Add Resume</NavLink>
    </li>
    <li>
      <NavLink to="/auth">Login</NavLink>
    </li>
  </ul>
};

export default NavLinks;