import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from './join.module.css';
import { Link } from "react-router-dom";
function Join(){
  const [userid,setuserid]=useState("");
  const [sessionid,setsessionid]=useState("");
  const navigate=useNavigate();

   const handlea=(e)=>{
    setuserid(e.target.value);
  }

   const handleb=(e)=>{
    setsessionid(e.target.value);
  }

   const handleSubmit=(e)=>{
    e.preventDefault();
    const data={
      id_user:userid,
      id_session:sessionid
    }
    axios.post('http://localhost:8244/joinsession',data)
    .then(res=>{
      console.log(res.data);
      navigate('/position',{state:{id_user:userid,id_session:sessionid}})
    })
    .catch(err=>{
      console.log(err);
    })
    console.log(userid+" "+sessionid);

   }
  return (
    <div >
      <form onSubmit={handleSubmit}  className="form">
        <label>createdby</label>
        <input
          placeholder="name"
          type="text"
          value={userid}
          onChange={handlea} className={style.input}
        />
        <br></br>
        <label>sessionname</label>
        <input
          placeholder="email"
          type="text"
          value={sessionid}
          onChange={handleb} className={style.input}
        />

        <br></br>
        <button type="submit" className={style.btn}>Signup</button>
        <br />
        <Link to="/login" className={style.choice}>Already have a account</Link>
      </form>
    </div>
  );
}
export default Join;