import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/index";
import { AuthProvider } from "./context/Auth";
import PrivateRoutes from "./component/PrivateRoute";
import CreateStudents from "./pages/Admin/createStudents";
import CreateClass from "./pages/Admin/createClass";
import ViewStudents from "./pages/ClassTeacher/viewStudents";
import CreateclassTeacher from "./pages/Admin/createClassTeacher";
import CreateClassArms from "./pages/Admin/createClassArms";
import CreateSessionTerm from './pages/Admin/createSessionTerm';
import TeacherHome from "./pages/ClassTeacher";
import AdminPanel from "./pages/Admin";
import TakeAttendance from "./pages/ClassTeacher/TakeAttendance";
import ViewClassAttendance from './pages/ClassTeacher/viewClassAttendance';
import ViewStudentAttendance from './pages/ClassTeacher/viewStudentAttendance';
import Reports from "./pages/ClassTeacher/Reports";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route element={<PrivateRoutes/>}>
            <Route exact path="/admin" element={<AdminPanel/>}/>
            <Route exact path="/admin/students" element={<CreateStudents />} />
            <Route exact path="/admin/classes" element={<CreateClass />} />
            <Route exact path="/admin/teachers" element={<CreateclassTeacher />} />
            <Route exact path="/admin/arms" element={<CreateClassArms/>} />
            <Route exact path="/admin/session" element={<CreateSessionTerm/>} />
            <Route exact path="/teacher/viewStudents" element={<ViewStudents/>} />
            <Route exact path="/teacher/TakeAttendance" element={<TakeAttendance/>} />
            <Route exact path="/teacher/ViewClassAttendance" element={<ViewClassAttendance/>} />
            <Route exact path="/teacher/ViewStudentAttendance" element={<ViewStudentAttendance/>} />
            <Route exact path="/teacher/Today'sReports" element={<Reports/>} />
            <Route exact path="/teacher" element={<TeacherHome/>} />
            
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;

