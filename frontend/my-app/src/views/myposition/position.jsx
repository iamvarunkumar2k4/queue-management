import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import socket from "../socket";
import { useContext } from "react";
import { AppContext } from "../../Appcontext";
function Position(){
    const location = useLocation();
    const { user, session,setSession} = useContext(AppContext);
    console.log(user+" "+session);
    let [position,setpostion]=useState('loading');
    useEffect(()=>{
      if(!user && !session)
      {
        return;
      }
      else
        {
      const data={
        id_user:user,
        shortName:session
      }
      console.log(data);
      axios.post('http://localhost:8244/myposition',data)
        .then(res=>{
          console.log(res.data);
          setpostion(res.data.position);
        })
        .catch(err=>{
          console.log(err);
        })
        socket.on("data",(data)=>{
          console.log(data)
          setpostion(data.indexOf(user)+1);
          if(data.indexOf(user)===-1)
          {
            setSession(null);
          }
        })
      }
    },[user,session])
    return (
  <div>
    {!session
      ? "No session joined"
      : `You are currently at ${position}`}
  </div>
);
}
export default Position;