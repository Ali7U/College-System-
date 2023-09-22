import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../Auth/Login";
import PostCourse from "./courses/PostCourse";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import Dashboard from "../pages/Dashboard_Teacher/Dashboard";
import GetCourse from "./courses/GetCourse";
import PostClass from "./classes/PostClass";
import DeleteClass from "./classes/DeleteCla";
import DeleteCla from "./classes/DeleteCla";
import GetClasses from "./classes/GetClasses";
import GetClasses2 from "./Students/GetClasses";
import PutClass from "./classes/PutClass";
import Login2 from "../Authentication/Login";
import AddedStudentToClass from "./Students/AddedStudentToClass";
import ProtectedRouter from "./ProtectedRouter";
import StudentRouter from "./StudentRouter";
import MyClasses from "./Students/MyClasses";
import MyDashboard from "../pages/Dashboard_Student/MyDashboard";
import Main from "../pages/Main";

function Router() {
  const token = localStorage.getItem("token") as string;

  const decodedToken: any = jwtDecode(token);

  // const navigate = Navigate()

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/Dashboard_Teacher"
          element={
            decodedToken?.role === "Teacher" ? (
              <Dashboard />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
        <Route index path="/" element={<Main />} />
        <Route index path="/Login" element={<Login />} />
        <Route element={<ProtectedRouter />}>
          <Route path="/course/add" element={<PostCourse />} />
          <Route path="/course/my_courses/" element={<GetCourse />} />

          {/* Classes Router */}
          <Route path="/classes/add/" element={<PostClass />} />
          <Route path="/classes/remove/" element={<DeleteCla />} />
          <Route path="/classes/" element={<GetClasses />} />
          <Route path="/classes/update/:id" element={<PutClass />} />
        </Route>

        {/* Studnets */}
        <Route index path="/students/login" element={<Login2 />} />
        <Route element={<StudentRouter />}>
          <Route index path="/myDashboard" element={<MyDashboard />} />
          <Route path="/myDashboard/Show_Classes/" element={<GetClasses2 />} />
          <Route
            path="/myDashboard/Show_Classes/added/"
            element={<AddedStudentToClass />}
          />
          <Route path="/myDashboard/my_classes" element={<MyClasses />} />
        </Route>
      </Routes>
    </>
  );
}

export default Router;
