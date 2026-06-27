import Home from "./views/homepage/home";
import Signup from "./views/signuppage/signup.jsx";
import Signin from './views/signinpage/signin.jsx';
import { Routes, Route } from "react-router-dom";
import Create from "./views/createsession/create.jsx";
import Join from "./views/joinsession/join.jsx";
import Position from "./views/myposition/position.jsx";
import Next from "./views/next/next.jsx";
import Auth from "./views/Auth/Auth.jsx";
import Profile from "./views/profile/Profile.jsx";
import Default from "./views/Default.jsx";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./views/dashboard/Dashboard.jsx";
import ProtectedRoutes from "./views/Protected.jsx";
import { useContext } from "react";
import { AppContext } from "./Appcontext.js";
function App() {
  const {token,loading}=useContext(AppContext);
  if (loading) return null;
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<Auth />}>
          <Route path="/signin" element={!token ? <Signin /> : <Navigate to="/profile" />} />
          <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/profile" />} />
        </Route>

        <Route element={<ProtectedRoutes token={token} />}>
          <Route element={<Dashboard></Dashboard>}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/createsession" element={<Create />} />
            <Route path="/joinsession" element={<Join />} />
            <Route path="/position" element={<Position />} />
            <Route path="/next" element={<Next />} />
          </Route>
        </Route>
  
        <Route path="*" element={<Default />} /> 
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;