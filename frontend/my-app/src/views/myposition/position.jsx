import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import socket from "../socket";
import { useContext } from "react";
import { AppContext } from "../../Appcontext";
import api from "../../axios";
function Position(){
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
      api.post('/myposition',data)
        .then(res=>{
          setpostion(res.data.position);
        })
        .catch(err=>{
          console.log(err);
        })
        socket.on("data",(data)=>{
          setpostion(data.indexOf(user)+1);
          if(data.indexOf(user)===-1)
          {
            localStorage.removeItem("joined_session")
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