import Home from "./views/homepage/home";
import Login from "./views/loginpage/login.jsx";
import Signin from "./views/signuppage/signup.jsx";

import { Routes, Route } from "react-router-dom";
import About from "./views/homepage/about.jsx";
import Features from "./views/homepage/feature";
import Contacts from "./views/homepage/contacts";
import HowItWorks from "./views/homepage/howItWorks";
import Navbar from "./views/homepage/navbar";
import Footer from "./views/homepage/footer";
import Mainlayout from "./views/mainlayout";
import Create from "./views/createsession/create.jsx";
import Join from "./views/joinsession/join.jsx";
import Position from "./views/myposition/position.jsx";
import Next from "./views/next/next.jsx";
import Auth from "./views/Auth.jsx";
import Dashboard from "./views/dashboard/Dashboard.jsx";
import Content from "./views/Content.jsx";
import Profile from "./views/profile/Profile.jsx";
import Default from "./views/Default.jsx";
function App() {
  return (
    <div>
      <Routes>
        <Route element={<Mainlayout/>}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/contact" element={<Contacts />} />
        </Route>
        <Route element={<Auth></Auth>}>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signin/>}></Route>
        </Route>
        <Route element={<Content/>}>
        <Route path='/profile' element={<Profile></Profile>}></Route>
         <Route path="/createsession" element={<Create/>}></Route>
         <Route path="/joinsession" element={<Join/>}></Route>
         <Route path="/position" element={<Position/>}></Route>
         <Route path="/next" element={<Next/>}></Route>
        </Route>
        <Route path="*" element={<Default></Default>}></Route>
      </Routes>
    </div>
  );
}
export default App;