import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "../Authentication/Login";
import jwtDecode from "jwt-decode";

function StudentRouter() {
  const token :any= localStorage.getItem("token");
  const decodedToken:any = jwtDecode(token) as string ;

  if (decodedToken.role === "Teacher") {
    return <Navigate to={"/login"} />;
  } 
  
  return <Outlet />;
  
}

export default StudentRouter;
