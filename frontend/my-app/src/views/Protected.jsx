import {Navigate, Outlet } from 'react-router-dom';
const ProtectedRoutes=({token})=>{
    if(!token){
      return <Navigate to="/signin" />
    }
    return <Outlet />;
  }
  export default ProtectedRoutes;