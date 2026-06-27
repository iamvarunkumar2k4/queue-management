import React from "react";
import line from '../../assets/line.png';
import { Outlet } from "react-router-dom";
import Style from './Auth.module.css'
function Auth(){
  return(
    <div className={Style.main}>
    <div className={Style.right}>
      <Outlet></Outlet>
    </div>
    <div className={Style.left}>
      <img src={line} alt="line" className={Style.image}></img>
    </div>
    </div>
  );
}
export default Auth;