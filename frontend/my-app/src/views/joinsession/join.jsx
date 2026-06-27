import React from "react";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import style from './join.module.css';
import socket from "../socket";
import api from "../../axios";
import {toast} from 'react-toastify';
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../Appcontext";
function Join(){
  const [session_id,setsession_id]=useState("");
  const [status,setstatus]=useState("none");
  const [history,sethistory]=useState([]);
  const [display,setdisplay]=useState(false);
  const {user,setjoinedsession,joinedsession}=useContext(AppContext);
  const navigate=useNavigate();
   const handleb=(e)=>{
    setsession_id(e.target.value);
  }
  useEffect(()=>{
    const fetch=async()=>{
      const res=await api.get('/statusvalue');
      setstatus(res.data.status);
      sethistory(res.data.history);
      console.log(res.data.history);
    }
    fetch();
    if(joinedsession)
    {
      socket.emit("join_session",joinedsession);
    }
    socket.on("status_changed",(data)=>{
      console.log("socket data is coming")
      if(user.toString() === data.user_id.toString()) 
        {setstatus(data.status);
          console.log("status set"+data.status);
        }
      if(data.status==="accepted") navigate('/position');
    })
    return () => {
      socket.off("status_changed");
    };
    
  },[joinedsession, user]);
   const handleSubmit=async(e)=>{
    e.preventDefault();
    try
    {
      console.log(session_id);
      socket.emit("join_session", session_id); // join FIRST
      setjoinedsession(session_id);
      localStorage.setItem('joinedsession',session_id)
      await api.post('/joinsession', { session_id }); // THEN API
      toast.success("joined a session"+session_id);
    }
    catch(err)
    {
      console.log(err);
      toast.error(err.response?.data?.error || "Login failed. Please try again.");
    }
   }
   const handleClick=async()=>{
    try{
      const res=await api.post('/gobackfromjoin');
      console.log(res);
      setjoinedsession(null);
      localStorage.removeItem("joinedsession");
    }catch(err)
    {
      console.log(err);
    }
   }
  return (
    <div className={style.main} onClick={(e) =>{ e.stopPropagation();setdisplay(false)}}>
      {status==="none" && <form onSubmit={handleSubmit} className={style.box}>
        <label>Enter Session Code</label>
        <input
          placeholder="email"
          type="text"
          value={session_id}
          onChange={handleb} className= {style.input} onClick={(e) => {
            e.stopPropagation();
            setdisplay(true);
          }}
        />
          <button type="submit" className={style.btn}>Join</button>
        {display && (
        <>
        <p>recent joined sessions</p>
        <div className={style.recentsearch}>
          {history.map((element, index) => (
            <p key={index} onClick={(e)=>{e.stopPropagation();
              setsession_id(element.item);
            }}
          style={{borderBottom:"1px solid grey",borderRadius:"5px"}}>
          {element.item}</p>
          ))}
        </div>
        </>
        )}
        <h2 className={style.text}>OR</h2>
        <h2 className={style.text}>join by scanning the qr of session</h2>
      </form>}
      {status==="pending"&&<div className={style.box}>
        <h2 className={style.text}>Your request is pending</h2>
      </div>}
      {status==="accepted"&&<div className={style.box}>
        <h2 className={style.text}>You are currently in a session</h2>
      </div>}
      {status==="rejected"&&<div className={style.box}>
        <h2 className={style.text}>not allowed to enter in session</h2>
        <button onClick={handleClick} className={style.btn}>Back to Join</button>
      </div>}
    </div>
  );
}
export default Join;