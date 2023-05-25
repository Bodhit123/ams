import React, { useEffect, useState } from "react";
import Sidebar1 from "../../component/sidebar1";
import Topbar from "../../component/topbar";
import "../Admin/css/ruang-admin.css";
import Footer from "../../component/footer";


const TeacherHome = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const classId = user.classId;
  const ArmId = user.classArmId;
  const url = "http://localhost:5000";
  const [classLength, setClassLength] = useState();
  const [studLength, setStudLength] = useState();
  const [armsLength, setArmsLength] = useState();
  const [attendance, setAttendance] = useState();
  const getStudents = async () => {
    const response = await fetch(`${url}/students/teacher/home`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        classId: user.classId,
        classArmId: user.classArmId,
      }),
    });

    const data = await response.json();
    console.log(data.length);
    setStudLength(data.length);
  };

  const getClasses = async () => {
    const response = await fetch(`${url}/class`);
    const data = await response.json();
    setClassLength(data.length);
  };
  const getArms = async () => {
    const response = await fetch(`${url}/arms`);
    const data = await response.json();
    setArmsLength(data.length);
  };

  const getClassAttendance = async () => {
    const response = await fetch(
      `${url}/students/attendance/${classId}/${ArmId}`
    );
    const data = await response.json();
    setAttendance(data.length);
  };

  useEffect(() => {
    getStudents();
    getClasses();
    getArms();
    getClassAttendance();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div id="page-top">
        <div id="wrapper">
          {/* <!-- Sidebar --> */}
          <Sidebar1 />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              {/* <!-- TopBar --> */}
              <Topbar />
              {/* <!-- Container Fluid--> */}

              <div className="container-fluid" id="container-wrapper">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">
                    Class Teacher Dashboard{" "}
                  </h1>
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
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-uppercase mb-1">
                              Students
                            </div>
                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                              {studLength}
                            </div>
                            <div className="mt-2 mb-0 text-muted text-xs">
                              {/* <!-- <span className="text-success mr-2"><i className="fas fa-arrow-up"></i> 20.4%</span>
                        <span>Since last month</span> --> */}
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-users fa-2x text-info"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-uppercase mb-1">
                              classes
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                              {classLength}
                            </div>
                            <div className="mt-2 mb-0 text-muted text-xs">
                              {/* <!-- <span className="text-success mr-2"><i className="fa fa-arrow-up"></i> 3.48%</span>
                        <span>Since last month</span> --> */}
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-chalkboard fa-2x text-primary"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-uppercase mb-1">
                              class Arms
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                              {armsLength}
                            </div>
                            <div className="mt-2 mb-0 text-muted text-xs">
                              {/* <!-- <span className="text-success mr-2"><i className="fas fa-arrow-up"></i> 12%</span>
                        <span>Since last years</span> --> */}
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-code-branch fa-2x text-success"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-uppercase mb-1">
                              Total Student Attendance
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                              {attendance}
                            </div>
                            <div className="mt-2 mb-0 text-muted text-xs">
                              {/* <!-- <span className="text-danger mr-2"><i className="fas fa-arrow-down"></i> 1.10%</span>
                        <span>Since yesterday</span> --> */}
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-calendar fa-2x text-warning"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <!--Row--> */}
                </div>
                {/* <!---Container Fluid--> */}
              </div>
              <Footer />
            </div>
          </div>

          {/* <!-- Scroll to top --> */}
          <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up"></i>
          </a>

          {/* <script src="../vendor/jquery/jquery.min.js"></script>
  <script src="../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="../vendor/jquery-easing/jquery.easing.min.js"></script>
  <script src="js/ruang-admin.min.js"></script>
  <script src="../vendor/chart.js/Chart.min.js"></script>
  <script src="js/demo/chart-area-demo.js"></script>   */}
        </div>
        <div />
      </div>
    </>
  );
};

export default TeacherHome;
