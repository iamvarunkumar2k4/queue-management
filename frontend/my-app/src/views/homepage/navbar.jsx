import React from "react";
import user from '../../assets/user.png';
import { Link } from "react-router-dom";
import style from './navbar.module.css';

function Navbar() {
  return (
    <div className={style.navbar}>
      <div className={style.logo}>
        <img src={user} alt={style.logo} />
        <span>QueueEase</span>
      </div>
      <Link to={"/signin"}><button className={style.btn}>Get Started</button></Link>
    </div>
  );
}
export default Navbar;