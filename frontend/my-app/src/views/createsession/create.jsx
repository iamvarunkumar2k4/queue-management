import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import style from './create.module.css';
import { toast } from "react-toastify";
import api from "../../axios";
import socket from "../socket";
import { AppContext } from "../../Appcontext";
function Create() {
  const [sessionName, setsessionName] = useState("");
  // 1. Change "whocanjoin" to state so React remembers the choice
  const [whocanjoin, setWhocanjoin] = useState(""); 
  // 2. Initialize as actual boolean false, not a string
  const [view, setview] = useState(false); 
  const {setcreatedsession,createdsession}=useContext(AppContext);
  const navigate = useNavigate();

  const handleb = (e) => {
    setsessionName(e.target.value);
  };

  useEffect(() => {
    const fetchCanCreate = async () => {
      try {
        const res = await api.get('/cancreate');
        console.log(res);
        // Assuming res.message is a boolean (true if they can't create, false if they can)
        // Or adapt this depending on what your backend actually returns
        setview(res.data.message); 
        console.log(view);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCanCreate();
    if(createdsession) socket.emit("join_session",createdsession);
  },[view]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sessionName) {
      toast.error("enter session name");
      return;
    }
    if (!whocanjoin) {
      toast.error("choose one option for who can join");
      return;
    }
    try {
      const res=await api.post('/createsession', { sessionName, whocanjoin });
      const session_id=res.data.session_id;
      socket.emit("join_session",session_id);
      localStorage.setItem('createdsession',session_id);
      setcreatedsession(session_id);
      toast.success("session created");
      navigate('/next');
      console.log(res);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className={style.main}>
      {view ? (
        <h3>cannot create</h3>
      ) : (
        <form onSubmit={handleSubmit} className={style.box}>
          <label>sessionname</label>
          <input
            placeholder="session name"
            type="text"
            value={sessionName}
            onChange={handleb}
            className={style.input}
          />
          
          <h2>choose who can join the session cannot change after</h2>
          
          <label htmlFor="anyone">Anyone</label>
          <input 
            type="radio" 
            name="whocanjoin" 
            value="Anyone" 
            id="anyone" 
            onChange={() => setWhocanjoin('Anyone')} 
            checked={whocanjoin === 'Anyone'}
          />
          
          <label htmlFor="strict">Strict</label>
          <input 
            type="radio" 
            name="whocanjoin" 
            value="Strict" 
            id="strict" 
            onChange={() => setWhocanjoin('Strict')} 
            checked={whocanjoin === 'Strict'}
          />
          
          <button type="submit" className={style.btn}>Create</button>
        </form>
      )}
    </div>
  );
}

export default Create;