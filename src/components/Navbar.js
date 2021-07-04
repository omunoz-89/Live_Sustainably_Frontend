import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import axios from "axios";




const Navbar = (props) => {
  const CONNECTION_URI = process.env.REACT_APP_SERVER_URL;

    return (
        <nav className="navbar is-success is-light" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" id='logo' href="/">
      <img id="logo-img" src="https://res.cloudinary.com/sei412-om/image/upload/v1625163518/liveS_dlagci.png"/>
    </a>

    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div className="navbar-menu">
    <div className="navbar-start">
      <NavLink className="navbar-item" exact to="/">Home</NavLink>
      <NavLink className="navbar-item"  to="/about">About</NavLink>
      <NavLink className="navbar-item"  to="/plants">Plants</NavLink>
      {
        props.isAuth
        ?<NavLink className="navbar-item"  to="/garden">My Garden</NavLink>
        : <a href="#"></a>

      }

    </div>
{
    props.isAuth
    ?<div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <NavLink className="navbar-item button is-dark"  to="/profile">Profile</NavLink>
          <span onClick={props.handleLogout} className="navbar-item button is-danger is-light logout-link">Logout</span>
        </div>
      </div>
    </div>
    :<div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <NavLink className="navbar-item button is-light is-link"  to="/signup">Create Account</NavLink>
          <NavLink className="navbar-item button is-light"  to="/login">Login</NavLink>
        </div>
      </div>
    </div>
}
  </div>
</nav>
    );
}

export default Navbar;
