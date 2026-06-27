import React, { useContext } from "react";
import { useState } from "react";
import {toast} from 'react-toastify';
import api from "../../axios";
import style from './next.module.css';
import socket from "../socket";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Blockview from "../blockview";
import { AppContext } from "../../Appcontext";
function Next(){
  const [view,setview]=useState(false);
  const [display,setdisplay]=useState(false);
  const[src,setsrc]=useState("");
  const [total,settotal]=useState("loading");
  const navigate=useNavigate();
  const [name,setname]=useState("loading");
  const [email,setemail]=useState("loading");
  const [pendingList, setPendingList] = useState([]);
  const {createdsession,setcreatedsession}=useContext(AppContext);

  useEffect(()=>{
    if(!createdsession) return;
    const fetch=async()=>{
      try {
        const res = await api.get('/cancreate');
        setview(res.data.message);
        settotal(res.data.total);
        setPendingList(res.data.pendinglist);
        console.log(res.data.message);
        console.log(res.data.total);
        console.log(res.data.pendinglist);
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
    const handlePending=(newUser) => {
      setPendingList(newUser);
      console.log("pending user data is updated")
    }
    const handledata=(data)=>{
      settotal(data.length);
      console.log(data.length);
    }
    console.log("Emitting join:", createdsession);
    console.log("socket is working");
    socket.on('pending', handlePending);
    socket.emit("join_session",createdsession);
    socket.on('data',handledata);
    return () => {
    socket.off('pending', handlePending);
    socket.off('data',handledata);
    };  
  },[createdsession])
  async function handleClick(){
    try{
      const res=await api.post('/next');
      setname(res.data.name);
      setemail(res.data.email);
    }
    catch(err){
      console.log(err);
      setname("loading");
      setemail("loading");
      toast.error(err.response?.data?.error || "Please try again.");
    }
  }
  const getqr=async()=>{
    try{
      const res=await api.get('/getqr');
    setsrc(res.data.qrcode);
    setdisplay(true);
    }
    catch(err){
      console.log(err);
      toast.error(err.response?.data?.error || "Please try again.");
    }
  }
  
  const handleDelete=async()=>{
    try{
      const res=await api.post('/deletesession');
      console.log(res);
      toast.success("session deleted");
      localStorage.setItem('createdsession',null);
      setcreatedsession(null);
      navigate('/createsession');
    }
    catch(err){
      console.log(err);
      toast.error(err.response?.data?.error || "Please try again.");
    }
  }

  const handleApprove=async(user_id)=>{
    try{
    const res=await api.post('/accept',{iuser_id:user_id});
    setPendingList(prev => prev.filter(user => user.user_id !== user_id));
    console.log(res);
    
    }catch(err){
      console.log(err);
    }
  }

  const handleReject=async(user_id)=>{
    try{
    const res=await api.post('/reject',{iuser_id:user_id});
    setPendingList(prev => prev.filter(user => user.user_id !== user_id));
    console.log(res);
    }
    catch(err){
      console.log(err);
    }
  }
  return(
    <div className={style.main}>
      {
      view?
      <div className={style.box}>
      <button type="submit" onClick={handleClick} className={style.btn}>Next</button>
      {
        display?
        <div>
          <img src={src} className={style.img} alt="qr"></img>
          <button onClick={()=>{setdisplay(false)}} className={style.btn}>Hide</button>
        </div>
          :<button type="button" onClick={getqr} className={style.btn}>Get QR</button>
      }
      <h3>current users in the session {total}</h3>
      <h2>Current User</h2>
      <h2>{name}</h2>
      <h2>{email}</h2>
      <button type="button" onClick={handleDelete} className={style.btn}>delete</button>
      <h2>pending users</h2>
      <div className={style.pending}>
        {
        // Add 'return' or use parentheses () for an implicit return
        pendingList.map((user) => (
          <Blockview 
            key={user.user_id} // Make sure to use the correct unique ID
            name={user.name} 
            email={user.email} 
            docs_id={user.user_id} 
            onApprove={() => handleApprove(user.user_id)} 
            onReject={() => handleReject(user.user_id)}
          />
        ))
      }
      </div>
      </div>
      :
      "have not created any session"
      }
    </div>
  );
}
export default Next;