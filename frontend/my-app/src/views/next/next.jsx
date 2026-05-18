import React from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useContext ,useState} from "react";
import { AppContext } from "../../Appcontext";
import { useEffect } from "react";
import api from "../../axios";

function Next(){
  const location = useLocation();
  const {setCreated,created}=useContext(AppContext);
   const[src,setsrc]=useState("");
  const data={
    shortName:created
  }
  useEffect(()=>{
    api.post('/next',data)
    .then((res)=>{
      console.log(res.data);
      setsrc(res.data.qrcode);
    })
    .catch(err=>{
      console.log(err);
    })
  })
  function handleClick(){
    api.post('/next',data)
    .then((res)=>{
      console.log(res.data);
      if(res.data.data.users.length===0)
      {
        localStorage.removeItem("created_session");
        setCreated(null);
      }
    })
    .catch(err=>{
      console.log(err);
    })
  }
  return(
    <div>
      {created?
      <div><button type="submit" onClick={handleClick}>Next</button>
      <img src={src}></img>
      </div>
      :"not created one yet"}
    </div>
  );
}
export default Next;