import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import style from './Dashboard.module.css';
import { AppContext } from "../../Appcontext";

function Dashboard() {
  const navigate=useNavigate();
  const {settoken}=useContext(AppContext);
  const logout=()=>{
    localStorage.clear();
    localStorage.removeItem("token");
    settoken(null);
    navigate('/');
  }
  return (
    <div className={style.navbar}>
      <div className={style.logo}>
        <span>QueueEase</span>
      </div>
      <div className={style.center}>
        <Link to="/createsession">Create</Link>
        <Link to="/joinsession">Join</Link>
        <Link to="/profile">profile</Link>
        <Link to="/settings">settings</Link>
        <Link to="/position">position</Link>
        <Link to="/next">next</Link>
      </div>
      <button className={style.btn} onClick={logout}>Logout</button>
    </div>
  );
}
export default Dashboard;