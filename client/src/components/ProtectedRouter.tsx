import jwtDecode from "jwt-decode";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRouter() {
  const token :any= localStorage.getItem("token");
  const decodedToken:any = jwtDecode(token) as string ;

  if (!decodedToken.role) {
    return <Navigate to={"/students/login"} />;
  } 
  
  return <Outlet />;
}

export default ProtectedRouter;
