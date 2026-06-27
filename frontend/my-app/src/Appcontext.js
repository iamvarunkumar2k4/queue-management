import { createContext, useState } from "react";
import { useEffect } from "react";
export const AppContext = createContext();

export function AppProvider({ children }) {
  const [token, settoken] = useState(null);
  const [user, setuser] = useState(null);
  const [loading,setloading]=useState(true);
  const [createdsession,setcreatedsession]=useState(null);
  const [joinedsession,setjoinedsession]=useState(null);
  useEffect(() => {
  const savedtoken=localStorage.getItem("token");
  const saveduser=localStorage.getItem("user_id");
  const createdsession=localStorage.getItem('createdsession');
  const savedsession=localStorage.getItem('joinedsession');
  if(savedtoken) settoken(savedtoken);
  if(saveduser) setuser(saveduser);
  if(createdsession) setcreatedsession(createdsession);
  if(savedsession) setcreatedsession(joinedsession);
  setloading(false);
},[]);
  return (
    <AppContext.Provider value={{token,settoken,loading,setloading,setuser,user,createdsession,setcreatedsession,joinedsession,setjoinedsession}}>
      {children}
    </AppContext.Provider>
  );
}