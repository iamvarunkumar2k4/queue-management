import React from "react";
import { Link } from "react-router-dom";
function Display(){
  return(
    <div>
      <Link to='/createsession'>createsession</Link>
      <Link to='/joinsession'>joinsession</Link>
    </div>
  );
}
export default Display;