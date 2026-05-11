import React from "react";
import Navbar from "./homepage/navbar";
import Footer from "./homepage/footer";
import { Outlet } from "react-router-dom";
function Mainlayout(){
  return(
    <div>
    <Navbar></Navbar>
    <Outlet></Outlet>
    <Footer></Footer>
    </div>
  );
}
export default Mainlayout;