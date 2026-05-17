import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from './create.module.css';
import { AppContext } from "../../Appcontext";
import { useContext } from "react";
const apiBase = process.env.REACT_APP_API_URL;
function Create(){
  const [createdBy,setcreatedBy]=useState("");
  const [sessionName,setsessionName]=useState("");
  const [description,setdescription]=useState("");
  const { setCreated ,user,created} = useContext(AppContext);
 
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
    axios.post(apiBase+'/createsession',data)
    .then(res=>{
      console.log(res.data);
      const name=res.data.post.shortName;
      console.log(name);
      
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
          placeholder="cratedby"
          type="text"
          value={createdBy}
          onChange={handlea} className={style.input}
        />
        <br></br>
        <label>sessionname</label>
        <input
          placeholder="session name"
          type="text"
          value={sessionName}
          onChange={handleb} className={style.input}
        />
        <br></br>
        <label>description</label>
        <input
          placeholder="description"
          type="text"
          value={description}
          onChange={handlec} className={style.input}
        />
        <br></br>
        <button type="submit" className={style.btn}>Create</button>
      </form>
      </div>
      }
      
    </div>
  );
}
export default Create;