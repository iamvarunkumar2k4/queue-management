import React from "react";
import './nabar.css';
import user from '../../assets/user.png';
function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={user} alt="logo" />
        <span>QueueEase</span>
      </div>

      <div className="center">
        <a className="active" href="#">Home</a>
        <a href="#">Features</a>
        <a href="#">How It Works</a>
        <a href="#">Benefits</a>
        <a href="#">Contact</a>
      </div>

      <button className="btn">Get Started</button>
    </div>
  );
}
export default Navbar;