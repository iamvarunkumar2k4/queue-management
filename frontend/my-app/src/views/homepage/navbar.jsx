import React from "react";
import './nabar.css';
import user from '../../assets/user.png';
import login from '../../';
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={user} alt="logo" />
        <span>QueueEase</span>
      </div>

      <div className="center">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/features">Features</Link>
        <Link to="/how-it-works">How It Works</Link>
        <Link to="/contacts">Contacts</Link>
      </div>

      <Link to={"/login"}><button className="btn">Get Started</button></Link>
    </div>
  );
}
export default Navbar;