import React from "react";
import './hero.css';
import thunder from "../../assets/bolt.png";
import heroImg from "../../assets/hero.png";
import { useNavigate } from "react-router-dom";
function Hero() {
const navigate=useNavigate();
function joinsession(){
  let token=localStorage.getItem("token");
  if(token)
  {
    navigate('/joinsession');
  }
  else
  {
    console.log("first login");
  }
}
function createsession(){
  let token=localStorage.getItem("token");
  if(token)
  {
    navigate('/createsession');
  }
  else
  {
    console.log("first login");
  }
}
  return (
    <div className="hero">
      
      {/* LEFT CONTENT */}
      <div className="hero-text">
        
        <div className="badge">
          <img src={thunder} alt="icon" width={15}/>
          <span>Smart Queue Management</span>
        </div>

        <h1>
          Manage Queues <br />
          Smarter, <br />
          <span className="highlight">Not Harder</span>
        </h1>

        <p>
          QueueEase helps you organize and manage your queues in real-time.
          No more chaos, long waits, or manual calling.
        </p>

        <div className="buttons">
          <button className="primary" onClick={createsession}>
            Create Session →
          </button>
          <button className="secondary" onClick={joinsession}>
            Join Session
          </button>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="hero-image">
        <img src={heroImg} alt="hero" />
      </div>

    </div>
  );
}
export default Hero;