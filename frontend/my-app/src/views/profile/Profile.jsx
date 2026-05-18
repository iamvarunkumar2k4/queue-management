import React from "react";
import style from './profile.module.css';
import { useEffect,useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../../Appcontext";
import api from "../../axios";
function Profile(){
  let [name,setname]=useState("loading");
  let [joined,setjoined]=useState("loading");
  let [created,setcreated]=useState("loading");
  const { user } = useContext(AppContext);
  useEffect(()=>{
    api.post('/profile',{id_user:user}).then(res=>{
      setname(res.data.name);
      setjoined(res.data.joined);
      setcreated(res.data.created);
    })
    .catch(err=>{
      console.log(err);
    })
  })
  return(
    <div className="style.main">
      <div className="style.name">
        <h1>username: {name}</h1>
      </div>
      <div className="style.created">
        <h1>No. of session joined: {joined.length}</h1>
      </div>
      <div className="style.joined">
        <h1>No. of session created: {created.length}</h1>
      </div>
    </div>
  );
}
export default Profile;