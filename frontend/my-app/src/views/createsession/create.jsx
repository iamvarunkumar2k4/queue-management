import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from './create.module.css';
import { Link } from "react-router-dom";
import { AppContext } from "../../Appcontext";
import { useContext } from "react";
function Create(){
  const [createdBy,setcreatedBy]=useState("");
  const [sessionName,setsessionName]=useState("");
  const [description,setdescription]=useState("");
  const { setCreated ,user,created} = useContext(AppContext);
  const[src,setsrc]=useState("");
  const navigate=useNavigate();
   const handlea=(e)=>{
    setcreatedBy(e.target.value);
  }

   const handleb=(e)=>{
    setsessionName(e.target.value);
  }

   const handlec=(e)=>{
    setdescription(e.target.value);
   }
   const handleSubmit=(e)=>{
    e.preventDefault();
    const data={
      createdBy:createdBy,
      sessionName:sessionName,
      description:description
    }
    axios.post('http://localhost:8244/createsession',data)
    .then(res=>{
      console.log(res.data);
      const name=res.data.post.shortName;
      console.log(name);
      // setsrc(res.data.qrcode);
      const sessionId=res.data.post.shortName;
      localStorage.setItem("created_session",sessionId);
      console.log(sessionId);
      setCreated(sessionId);
      navigate('/next',{state:{shortName:name}});
    })
    .catch(err=>{
      console.log(err);
    })
    console.log(createdBy+" "+sessionName+" "+description);

   }
  return (
    <div >
      {created?"you have already created one"
      :<div>
        <form onSubmit={handleSubmit}  className="style.main">
        <label>createdby</label>
        <input
          placeholder="name"
          type="text"
          value={createdBy}
          onChange={handlea} className={style.input}
        />
        <br></br>
        <label>sessionname</label>
        <input
          placeholder="email"
          type="text"
          value={sessionName}
          onChange={handleb} className={style.input}
        />
        <br></br>
        <label>description</label>
        <input
          placeholder="password"
          type="text"
          value={description}
          onChange={handlec} className={style.input}
        />
        <br></br>
        <button type="submit" className={style.btn}>Create</button>
      </form>
      <img src={src}></img>
      </div>
      }
      
    </div>
  );
}
export default Create;