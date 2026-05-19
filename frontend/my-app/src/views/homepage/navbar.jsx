import React from "react";
import user from '../../assets/user.png';
import login from '../../';
import { Link } from "react-router-dom";
import style from './navbar.module.css';

function Navbar() {
  return (
    <div className={style.navbar}>
      <div className={style.logo}>
        <img src={user} alt={style.logo} />
        <span>QueueEase</span>
      </div>

      <div className={style.center}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/features">Features</Link>
        <Link to="/how-it-works">How It Works</Link>
        <Link to="/contacts">Contacts</Link>
      </div>

      <Link to={"/login"}><button className={style.btn}>Get Started</button></Link>
    </div>
  );
}
export default Navbar;