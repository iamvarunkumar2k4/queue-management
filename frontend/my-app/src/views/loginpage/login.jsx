import React, { useState } from "react";
import axios from 'axios';
import style from './login.module.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../Appcontext";
import api from "../../axios";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleName=(e)=>{
    setName(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const { setUser,settoken } = useContext(AppContext);
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    console.log("Please fill all fields");
    return;
  }

  try {
    const res = await api.post('/signin', {
      email,
      password
    });

    const token = res.data.token;
    localStorage.setItem("token", token);
    settoken(token);

    const userId = res.data.user._id;
    localStorage.setItem("userid", userId);
    setUser(userId);

    console.log("Login successful:", token);

    navigate('/profile', { replace: true });

  } catch (err) {
    console.log("Login error:", err.response?.data || err.message);
  }
};

  return (
    <div className={style.main}>
      <form onSubmit={handleSubmit} className="form">
        <label>name</label>
        <input
          placeholder="name"
          type="text"
          value={name}
          onChange={handleName}
          className={style.input}
        />
        <br></br>
        <label>email</label>
        <input
          placeholder="email"
          type="text"
          value={email}
          onChange={handleEmail}
          className={style.input}
        />
        <br></br>
        <label>password</label>
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={handlePassword}
          className={style.input}
        />
        <br></br>
        <button type="submit" className={style.btn}>Login</button>
        <br></br>

        <Link to="/signup" className={style.choice}>do not have account</Link>
      </form>
    </div>
  );
}

export default Login;