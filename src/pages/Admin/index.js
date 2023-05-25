import React, { useEffect, useState } from "react";
import Sidebar from "../../component/sidebar";
import Topbar from "../../component/topbar";
import Footer from "../../component/footer";
import "../Admin/css/ruang-admin.css";

const AdminPanel = () => {
    const url = "http://localhost:5000";
    const [lenStud,setLenStud] =useState("");
    const [lenClass,setLenClass] = useState("");
    const [lenteacher,setLenteacher] = useState("");
    const [lenarms,setArms] =useState("");
    const [lenatten,setAtten] = useState("");
    const [lensession,setSession] = useState("");
    const [lenterm,setTerm] = useState("");


    useEffect(()=> {    
     fetchData();
    },[]);

    const fetchData = async () => {
        const response = await fetch(`${url}/students`);
        const data = await response.json();
        setLenStud(data.length);
        
        const res2 = await fetch(`${url}/class`);
        const data2 = await res2.json();
        setLenClass(data2.length);
        
        const res3 = await fetch(`${url}/arms`);
        const data3 = await res3.json();
        setArms(data3.length);
        
        const res4= await fetch(`${url}/login/attendance`);
        const data4 = await res4.json();
        setAtten(data4.length);

        const res5= await fetch(`${url}/session`);
        const data5 = await res5.json();
        setSession(data5.length);
        
        const res6= await fetch(`${url}/session/term`);
        const data6 = await res6.json();
        setTerm(data6.length);

        const res7= await fetch(`${url}/teacher`);
        const data7 = await res7.json();
        setLenteacher(data7.length);
    };


  return (
    <div>
      <div id="page-top">
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar />

              <div className="container-fluid" id="container-wrapper">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">Administrator Dashboard</h1>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="./">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Dashboard
                    </li>
                  </ol>
                </div>

                <div className="row mb-3">
                  {/* <!-- Students Card -->
          <?php 
$query1=mysqli_query($conn,"SELECT * from tblstudents");                       
$students = mysqli_num_rows($query1);
?> */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-uppercase mb-1">
                            STUDENTS
                            </div>
                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800"> {lenStud}</div>
                            <div className="mt-2 mb-0 text-muted text-xs"></div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-users fa-2x text-info"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- className Card -->
             <?php 
$query1=mysqli_query($conn,"SELECT * from tblclassName");                       
$className = mysqli_num_rows($query1);
?> */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-uppercase mb-1">
                              ClASSES
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{lenClass}</div>
                            <div className="mt-2 mb-0 text-muted text-xs"></div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-chalkboard fa-2x text-primary"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- className Arm Card -->
             <?php 
$query1=mysqli_query($conn,"SELECT * from tblclassNamearms");                       
$classNameArms = mysqli_num_rows($query1);
?> */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-uppercase mb-1">
                              CLASS ARMS
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{lenarms}</div>
                            <div className="mt-2 mb-0 text-muted text-xs"></div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-code-branch fa-2x text-success"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Std Att Card  -->
            <?php 
$query1=mysqli_query($conn,"SELECT * from tblattendance");                       
$totAttendance = mysqli_num_rows($query1);
?> */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-uppercase mb-1">
                            TOTAL STUDENT ATTENDANCE
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{lenatten}</div>
                            <div className="mt-2 mb-0 text-muted text-xs"></div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-calendar fa-2x text-secondary"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 
            <!-- Teachers Card  -->
            <?php 
            $query1=mysqli_query($conn,"SELECT * from tblclassteacher");                       
            $classNameTeacher = mysqli_num_rows($query1);
            ?> */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-uppercase mb-1">
                              CLASS TEACHERS
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                              {lenteacher}
                            </div>
                            <div className="mt-2 mb-0 text-muted text-xs"></div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-chalkboard-teacher fa-2x text-danger"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Session and Terms Card  -->
            <?php 
            $query1=mysqli_query($conn,"SELECT * from tblsessionterm");                       
            $sessTerm = mysqli_num_rows($query1);
            ?> */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-uppercase mb-1">
                              SESSION & TERMS
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                              {lensession}
                            </div>
                            <div className="mt-2 mb-0 text-muted text-xs"></div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-calendar-alt fa-2x text-warning"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Terms Card  -->
            <?php 
            $query1=mysqli_query($conn,"SELECT * from tblterm");                       
            $termonly = mysqli_num_rows($query1);
            ?> */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-uppercase mb-1">
                              TERMS
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {lenterm}
                            </div>
                            <div className="mt-2 mb-0 text-muted text-xs"></div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-th fa-2x text-info"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </div>

          <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
