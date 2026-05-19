import Home from "./views/homepage/home";
import Login from "./views/loginpage/login.jsx";
import Signin from "./views/signuppage/signup.jsx";

import { Routes, Route } from "react-router-dom";
import About from "./views/homepage/about.jsx";
import Features from "./views/homepage/feature";
import Contacts from "./views/homepage/contacts";
import HowItWorks from "./views/homepage/howItWorks";
import Mainlayout from "./views/mainlayout";
import Create from "./views/createsession/create.jsx";
import Join from "./views/joinsession/join.jsx";
import Position from "./views/myposition/position.jsx";
import Next from "./views/next/next.jsx";
import Auth from "./views/Auth.jsx";
import Content from "./views/Content.jsx";
import Profile from "./views/profile/Profile.jsx";
import Default from "./views/Default.jsx";
import { Navigate } from "react-router-dom";

function App() {
  const token=localStorage.getItem("token");

  return (
    <div>
      <Routes>

        <Route element={<Mainlayout />}>
          <Route path="/" element={token ? <Navigate to="/profile" /> : <Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contacts" element={<Contacts />} />
        </Route>

  
        <Route element={<Auth />}>
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/profile" />} />
          <Route path="/signup" element={!token ? <Signin /> : <Navigate to="/profile" />} />
        </Route>

        
        <Route
          element={token ? <Content /> : <Navigate to="/" />}
        >
          <Route path="/profile" element={<Profile />} />
          <Route path="/createsession" element={<Create />} />
          <Route path="/joinsession" element={<Join />} />
          <Route path="/position" element={<Position />} />
          <Route path="/next" element={<Next />} />
        </Route>

  
        <Route path="*" element={<Default />} /> 

      </Routes>
    </div>
  );
}

export default App;