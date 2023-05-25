// import React from "react";
// import { Outlet, Navigate } from "react-router-dom";


// const PrivateRoutes = () => {
//   let User = localStorage.getItem("user");
//   // const auth = useContext(AuthContext);
  
//   return User? <Outlet/> : <Navigate to="/"/>;
// };

// export default PrivateRoutes;

// import { Outlet, useNavigate,Route,Navigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/Auth";
// import TakeAttendance from "../pages/ClassTeacher/TakeAttendance";
// import ViewAttendance from '../pages/ClassTeacher/viewAttendance';
// import TeacherHome from "../pages/ClassTeacher";
// import ViewStudents from "../pages/ClassTeacher/viewStudents";

// const PrivateRoutes = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   if (user && user.role === "admin") {
//     // Allow access to all admin routes
//     return <Outlet />;
//   } else if (user && user.role === "teacher") {
//     // Allow access to teacher routes
//     return (
//       <>
//         <Route exact path="/teacher" element={<TeacherHome />} />
//         <Route
//           exact
//           path="/teacher/viewStudents"
//           element={<ViewStudents />}
//         />
//         <Route
//           exact
//           path="/teacher/TakeAttendance"
//           element={<TakeAttendance />}
//         />
//         <Route
//           exact
//           path="/teacher/ViewAttendance"
//           element={<ViewAttendance />}
//         />
//         <Navigate to="/teacher" replace />
//       </>
//     );
//   } else {
//     // Redirect to login page for unauthorized users
//     navigate("/");
//     return null;
//   }
// };

// export default PrivateRoutes;
import { useLocation, Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  // Check if user is logged in
  if (!user) {
    return <Navigate to="/" />;
  }

  // Check if user is authorized to access the requested page
  if (user.role === "admin" && location.pathname.startsWith("/teacher")) {
    return <Navigate to="/admin" />;
  }

  if (user.role === "teacher" && location.pathname.startsWith("/admin")) {
    return <Navigate to="/teacher" />;
  }

  // User is authorized to access the requested page
  return <Outlet />;
};

export default PrivateRoutes;
