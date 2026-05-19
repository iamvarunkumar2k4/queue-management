import { createContext, useState } from "react";
import { useEffect } from "react";
export const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [created, setCreated] = useState(null);
  const [token, settoken] = useState(null);
  useEffect(() => {
  const savedUser = localStorage.getItem("userid");
  const savedSession = localStorage.getItem("joined_session");
  const craetedSession=localStorage.getItem("created_session");
  const savedtoken=localStorage.getItem("token");

  if (savedUser) setUser(savedUser);
  if (savedSession) setSession(savedSession);
  if (craetedSession) setCreated(created);
  if(savedtoken) settoken(savedtoken);
},[]);
  return (
    <AppContext.Provider value={{ user, setUser, session, setSession,created,setCreated ,token,settoken}}>
      {children}
    </AppContext.Provider>
  );
}