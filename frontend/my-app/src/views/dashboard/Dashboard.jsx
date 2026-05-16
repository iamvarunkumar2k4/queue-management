import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Dashboard() {
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem("token");
    navigate('/');
  }
  return (
    <div className="navbar">
      <div className="logo">
        <span>QueueEase</span>
      </div>
      <div className="center">
        <Link to="/createsession">Create</Link>
        <Link to="/joinsession">Join</Link>
        <Link to="/profile">profile</Link>
        <Link to="/settings">settings</Link>
        <Link to="/position">position</Link>
        <Link to="/next">next</Link>
      </div>
      <button className="btn" onClick={logout}>Logout</button>
    </div>
  );
}
export default Dashboard;