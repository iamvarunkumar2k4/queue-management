import React from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
function Content(){
  return(
    <div>
      <Dashboard></Dashboard>
      <Outlet></Outlet>
    </div>
  );
}
export default Content;