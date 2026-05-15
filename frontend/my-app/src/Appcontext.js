import { createContext, useState } from "react";
import { useEffect } from "react";
export const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  useEffect(() => {
  const savedUser = localStorage.getItem("userid");
  const savedSession = localStorage.getItem("joined_session");

  if (savedUser) setUser(savedUser);
  if (savedSession) setSession(savedSession);
}, []);
  return (
    <AppContext.Provider value={{ user, setUser, session, setSession }}>
      {children}
    </AppContext.Provider>
  );
}