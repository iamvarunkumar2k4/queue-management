
import React, { useState } from "react";
import api from "../../axios";
import { useEffect } from "react";
import img from "../../assets/profile.png";
import styles from "./profile.module.css";
import mt from "../../assets/mountain.jpg";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AppContext } from "../../Appcontext";
function Profile(){
  const [name,setname]=useState("Loading...");
  const [email,setemail]=useState("Loading...");
  const [joinedate,setjoinedate]=useState("Loading...");
  const [joinedsession,setjoinedsession]=useState([]);
  const [display,setdisplay]=useState(false);
  const [display2,setdisplay2]=useState(false);
  const [createdsession,setcreatedsession]=useState([]);
  const {settoken}=useContext(AppContext);
  useEffect(()=>{
    const fetch=async()=>{
      try{
      const res=await api.post('/profile');
      setname(res.data.name);
      setemail(res.data.email);
      setjoinedate(res.data.joinedAt);
      setjoinedsession(res.data.joinedsessions);
      setcreatedsession(res.data.createdsessions);
      console.log(joinedsession);
      } catch(err)
      {
        console.log(err);
        toast.error(err.response?.data?.error || "Failed to fetch profile. Please try again.");
      }
    };
    fetch();
  }, []);
  const handleDeleteAC=async(password)=>{
    try{
    const res=await api.post('/deleteaccount', { password });
    console.log(res);
    if(res.status===200){
      toast.success("Account deleted successfully");
      localStorage.removeItem('token');
      settoken(null);
    }
  } catch(err)
    {
      console.log(err);
      toast.error(err.response?.data?.error || "Account deletion failed. Please try again.");
    }
  }
  function confirmLogout() {
    const userConfirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (userConfirmed) {
        const password=window.prompt("enter password to confirm");
        if(!password)
        {
          toast.error("Password is required");
          return;
        }
        handleDeleteAC(password);
    } else {
        toast.error("Account deletion cancelled");
    }
}
  return(
    <div>
      <div>
        <img src={mt} alt="mountain" className={styles.profile}/>
        <div className={styles.imgcover}>
          <img src={img} alt="Profile" className={styles.img}/>
        </div>
      </div>
      <div className={styles.about}>
      <p style={{ textAlign: "center" ,fontFamily: "Arial, sans-serif" ,fontSize: "1.2em" }}>Name: {name}</p>
      <p style={{ textAlign: "center" ,fontFamily: "Arial, sans-serif" ,fontSize: "1.2em" }}>Email: {email}</p>
      <p style={{ textAlign: "center" ,fontFamily: "Arial, sans-serif" ,fontSize: "1.2em" }}>Joined At: {joinedate}</p>
      <p style={{ textAlign: "center" ,fontFamily: "Arial, sans-serif" ,fontSize: "1.2em" }} onClick={()=>{setdisplay(!display)}}>How many joined: {joinedsession.length} click for more info</p>
      <p style={{ textAlign: "center" ,fontFamily: "Arial, sans-serif" ,fontSize: "1.2em" }} onClick={()=>{setdisplay2(!display2)}}>how many created: {createdsession.length} click for more info</p>
      </div>
      <div className={styles.box}>
        {display && (
        <>
        <h4>joined sessions</h4>
        <div className={styles.list}>
          {joinedsession.map((element, index) => (
            <p key={index} className={styles.item}>
          <span style={{fontFamily: "Arial, sans-serif" ,fontSize: "1em" }}>Title: {element.title}</span> <span style={{fontFamily: "Arial, sans-serif" ,fontSize: "1em" }}>joined on: {element.joinedAt}</span></p>
          ))}
        </div>
        </>
        )}
      </div>
      <div className={styles.box}>
        {display2 && (
        <>
        <h4>created sessions</h4>
        <div className={styles.list}>
          {createdsession.map((element, index) => (
            <p key={index} className={styles.item}>
          <span style={{fontFamily: "Arial, sans-serif" ,fontSize: "1em" }}>Title: {element.title}</span> <span style={{fontFamily: "Arial, sans-serif" ,fontSize: "1em" }}>created on: {element.createdAt}</span></p>
          ))}
        </div>
        </>
        )}
      </div>
      <button onClick={confirmLogout} className={styles.btn}>
        delete account
      </button>
    </div>
  );
}
export default Profile;