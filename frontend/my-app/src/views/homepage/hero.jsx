import React, { useContext } from "react";
import style from './hero.module.css';
import thunder from "../../assets/bolt.png";
import heroImg from "../../assets/hero.png";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import { AppContext } from "../../Appcontext";
function Hero() {
  const navigate=useNavigate();
  const {token}=useContext(AppContext);
  const joinsession=()=>{
    if(token){
      navigate('/joinsession');
    }
    else{
      toast.error("first signin");
    }
  }
const createsession=()=>{if(token)
  {
    navigate('/createsession');
  }
  else{
    toast.error("first signin");
  }
}
  return (
    <div className={style.hero}>
      
      {/* LEFT CONTENT */}
      <div className={style.herotext}>
        
        <div className={style.badge}>
          <img src={thunder} alt="icon" width={15}/>
          <span>Smart Queue Management</span>
        </div>

        <h1>
          Manage Queues <br />
          Smarter, <br />
          <span className={style.highlight}>Not Harder</span>
        </h1>

        <p>
          QueueEase helps you organize and manage your queues in real-time.
          No more chaos, long waits, or manual calling.
        </p>

        <div className={style.buttons}>
          <button className={style.primary} onClick={createsession}>
            Create Session
          </button>
          <button className={style.secondary} onClick={joinsession}>
            Join Session
          </button>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className={style.heroimage}>
        <img src={heroImg} alt="hero" />
      </div>

    </div>
  );
}
export default Hero;