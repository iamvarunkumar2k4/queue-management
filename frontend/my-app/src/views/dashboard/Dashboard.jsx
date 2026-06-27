import React, { useState, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import style from "./Dashboard.module.css";
import { AppContext } from "../../Appcontext";
import { toast } from "react-toastify";

function Dashboard() {
  const navigate = useNavigate();
  const { settoken } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (path) => {
    navigate(path);
    setMenuOpen(false); // close menu on mobile
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    settoken(null);
    navigate("/signin");
  };

  const confirmLogout = () => {
    const ok = window.confirm("Are you sure you want to log out?");
    if (ok) handleLogout();
    else toast.error("Logout cancelled");
  };

  return (
    <div className={style.main}>

      {/* TOP BAR */}
      <div className={style.top}>
        <h2 className={style.logo}>Queue</h2>

        <span
          className={style.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </span>

        {/* DESKTOP MENU */}
        <div className={style.menuDesktop}>
          <button onClick={() => go("/createsession")} className={style.button}>Create</button>
          <button onClick={() => go("/joinsession")} className={style.button}>Join</button>
          <button onClick={() => go("/next")} className={style.button}>Next</button>
          <button onClick={() => go("/profile")} className={style.button}>Profile</button>
          <button onClick={() => go("/position")} className={style.button}>MyPosition</button>
          <button onClick={confirmLogout} className={`${style.button} ${style.logout}`}>Logout</button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <div className={style.menuMobile}>
          <button onClick={() => go("/createsession")} className={style.button}>Create</button>
          <button onClick={() => go("/joinsession")} className={style.button}>Join</button>
          <button onClick={() => go("/next")} className={style.button}>Next</button>
          <button onClick={() => go("/profile")} className={style.button}>Profile</button>
          <button onClick={() => go("/position")} className={style.button}>MyPosition</button>
          <button onClick={confirmLogout} className={`${style.button} ${style.logout}`}>Logout</button>
        </div>
      )}

      {/* CONTENT */}
      <div className={style.bottom}>
        <Outlet />
      </div>

    </div>
  );
}

export default Dashboard;