import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../Appcontext";
import api from "../../axios";
import socket from "../socket";
import style from './position.module.css';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Position() {
  const {user,joinedsession,setjoinedsession} = useContext(AppContext);
  const [position, setPosition] = useState('loading');
  const [view,setview]=useState(false);
  const [message,setmessage]=useState("");
  const navigate=useNavigate();
  useEffect(() => {
    const fetch=async()=>{
      const res=await api.get('/hasjoined');
      setview(res.data.message);
      if(res.data.message)
      {
        const res2=await api.post('/myposition');
        setPosition(res2.data.position);
      }}
    fetch();
    const handleSocketData = (dataArray) => 
    {
      const userIndex = dataArray.findIndex(
        (item) => item.user_id.toString() === user._id.toString()
      );
      console.log("socket is working");
      if (userIndex === -1) {
        setPosition(-1);
      } else {
        setPosition(userIndex);
      }
      console.log("Socket data:", dataArray);
      console.log("User from context:", user);
      console.log("Comparing:", dataArray.map(u => u.user_id));
    };
    const handleMessage=(m)=>{
      setmessage(m);
    }
    socket.emit("join_session",joinedsession);
    socket.on("data", handleSocketData);
    socket.on("message", handleMessage);
    return () => {
      socket.off("data", handleSocketData);
      socket.off("message", handleMessage);
    };
  },[user]);
  const handleClick=async()=>{
    try{
    const res=await api.post('/goback');
    toast.success(res.data.message);
    setjoinedsession(null);
    localStorage.removeItem("joinedsession");
    navigate('/joinsession');
    }catch(err)
    {
      console.log(err);
      toast.error(err.response?.data?.error || "Please try again.");
    }
  }
  const handleLeave=async()=>{
    try{
    const res=await api.post('/leavesession');
    toast.success(res.data.message);
    setjoinedsession(null);
      localStorage.removeItem("joinedsession");
    navigate('/joinsession');
    }catch(err)
    {
      console.log(err);
      toast.error(err.response?.data?.error || "Please try again.");
    }
  }
  return (
    <div className={style.main}>
      <div className={style.box}>
        {
          view?
          <div className={style.text}>
          You are currently at {position+1}
          {
            position===-1?
            <div>
            <h3>Your position has reached zero. Please join another one by clicking goBack</h3>
            <button onClick={handleClick} className={style.btn}>goBack</button>
            </div>
            :
            <>
            <button onClick={handleLeave} className={style.btn}>leave session</button>
            </>
          }
        </div>:
        "have not join one session"
        }
        <h3>{message}</h3>
      </div>
    </div>
  );
}

export default Position;