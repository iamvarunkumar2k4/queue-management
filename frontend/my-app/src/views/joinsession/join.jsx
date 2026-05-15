import React from "react";
import { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from './join.module.css';
import { Link } from "react-router-dom";
import socket from "../socket";
import { useContext } from "react";
import { AppContext } from "../../Appcontext";
import { useEffect } from "react";
function Join(){
  const [name,setname]=useState("");
  const { setSession ,user} = useContext(AppContext);

  const navigate=useNavigate();
   const handleb=(e)=>{
    setname(e.target.value);
  }
   const handleSubmit=(e)=>{
    e.preventDefault();
    const data={
      id_user:user,
      shortName:name
    }
    axios.post('http://localhost:8244/joinsession',data)
    .then(res=>{
      console.log(res.data);
      const sessionId=res.data.data.shortName;
      localStorage.setItem("joined_session",sessionId);
      socket.emit("join_session",sessionId);
      console.log(sessionId);
      setSession(sessionId);
      navigate('/position',{state:{id_user:user,shortName:name}})
    })
    .catch(err=>{
      console.log(err);
    })
    console.log(user+" "+name);

   }
  return (
    <div className="style.main">
      <form onSubmit={handleSubmit}>
        <label>Enter Session Code</label>
        <input
          placeholder="email"
          type="text"
          value={name}
          onChange={handleb} className= {style.input}
        />
        <br></br>
        <button type="submit" className={style.btn}>Join</button>
        <br />
      </form>
    </div>
  );
}
export default Join;