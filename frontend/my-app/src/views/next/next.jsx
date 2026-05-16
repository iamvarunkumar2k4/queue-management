import React from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../Appcontext";
function Next(){
  const location = useLocation();
  const {setCreated,created}=useContext(AppContext);
  const data={
    shortName:created
  }
  function handleClick(){
    axios.post('http://localhost:8244/next',data)
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
      {created?<div><button type="submit" onClick={handleClick}>Next</button></div>:"not created one yet"}
    </div>
  );
}
export default Next;