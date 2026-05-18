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
import { useSearchParams } from "react-router-dom";
import api from "../../axios";
function Join(){
  const [name,setname]=useState("");
  const { setSession ,user,session} = useContext(AppContext);
  const [searchParams] = useSearchParams();
  useEffect(()=>{
  const query = searchParams.get("shortName"); 
  if(query){
    setname(query);
  }
},[])
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
    api.post('/joinsession',data)
    .then(res=>{
      console.log(res.data);
      const sessionId=res.data.data.shortName;
      localStorage.setItem("joined_session",sessionId);
      socket.emit("join_session",sessionId);
      console.log(sessionId);
      setSession(sessionId);
      navigate('/position');
    })
    .catch(err=>{
      console.log(err);
    })
    console.log(user+" "+name);

   }
  return (
    <div>{session?"cannot join another session till the is over"
      : <div className="style.main">
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
    }</div>
   
  );
}
export default Join;