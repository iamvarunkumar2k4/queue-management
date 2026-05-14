import React from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
function Next(){
  const location = useLocation();
  const data={
    id_session:location.state.id_session
  }
  function handleClick(){
    axios.post('http://localhost:8244/next',data)
    .then((res)=>{
      console.log(res.data);
    })
    .catch(err=>{
      console.log(err);
    })
  }
  return(
    <div>
      <button type="submit" onClick={handleClick}>Next</button>
    </div>
  );
}
export default Next;