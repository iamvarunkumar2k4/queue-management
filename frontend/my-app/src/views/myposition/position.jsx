import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../Appcontext";
import api from "../../axios";
import socket from "../socket";

function Position() {
  const { user, session, setSession } = useContext(AppContext);
  const [position, setPosition] = useState('loading');
  useEffect(() => {
    if (!user || !session) {
      return;
    }
    const data = {
      id_user: user,
      shortName: session
    };
    api.post('/myposition', data)
      .then(res => {
        setPosition(res.data.position);
      })
      .catch(err => {
        console.error("API error:", err);
      });
    const handleSocketData = (dataArray) => {
      const userIndex = dataArray.indexOf(user);
      if (userIndex === -1) {
        localStorage.removeItem("joined_session");
        setSession(null); 
      } else {
        setPosition(userIndex + 1);
      }
    };

    socket.on("data", handleSocketData);
    return () => {
      socket.off("data", handleSocketData);
    };

  }, [user, session, setSession]); 

  return (
    <div>
      {!session
        ? "No session joined"
        : `You are currently at ${position}`}
    </div>
  );
}

export default Position;