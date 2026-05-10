import "./Home.css";
import React from "react";
import Navbar from "./navbar";
import Hero from "./hero";
import Footer from "./footer";
function Home(){
  return(
    <div>
      <Navbar></Navbar>
      <Hero></Hero>
      <Footer></Footer>
    </div>
  )
}
export default Home;