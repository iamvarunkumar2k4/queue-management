import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import socket from "../socket";
function Position(){
    const location = useLocation();
    let [position,setpostion]=useState('loading');
    const id=location.state.id_user;
    const data={
      id_user:location.state.id_user,
      id_session:location.state.id_session
    }
    useEffect(()=>{
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
          setpostion(data.indexOf(id));
        })
    },[])
     return <div>You are currently at {position+1}</div>;
}
export default Position;