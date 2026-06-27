import style from "./Home.module.css";
import React from "react";
import Hero from "./hero";
import Navbar from "./navbar";
function Home(){
  return(
    <div className={style.main}>
        <Navbar></Navbar>
        <Hero></Hero>
    </div>
  )
}
export default Home;