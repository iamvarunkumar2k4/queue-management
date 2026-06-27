import React, { useState } from "react";
import style from './signin.module.css';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../../Appcontext";
import api from "../../axios";
function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {settoken,setuser}=useContext(AppContext);
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    toast.error("Please provide email and password");
    return;
  }
  else
  {
    try {
      const res = await api.post('/signin', {
        email,
        password
      });
      if (res.status === 200) {
        toast.success("Login successful!");
        const token = res.data.token;
        const user_id=res.data.user._id;
      localStorage.setItem("token", token);
      localStorage.setItem("user_id",user_id);
      setuser(user_id);
      settoken(token);
      }
      
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed. Please try again.");
      return;
    }
  }
};

  return (
    <div className={style.box}>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.inputGroup}>
        <label>email</label>
        <input
          placeholder="email"
          type="text"
          value={email}
          onChange={handleEmail}/>
        </div>

        <div className={style.inputGroup}>
        <label>password</label>
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={handlePassword}
        />
        </div>
        <div className={style.wrap}>
        <button type="submit" >Signin</button>
        <Link to="/signup" >do not have account</Link>
        </div>
      </form>
    </div>
  );
}

export default Signin;