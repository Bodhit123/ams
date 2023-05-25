/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import "../Admin/css/ruang-admin.css";
import Footer from "../../component/footer";
import Topbar from "../../component/topbar";
import Sidebar1 from "../../component/sidebar1";

const TakeAttendance = () => {
  const url = "http://localhost:5000";
  const [submitted, setSubmitted] = useState(false);
  const [classArmId, setClassArmId] = useState();
  const [subjectId, setSubjectId] = useState();
  const [classId, setClassId] = useState();
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [Arms, setArms] = useState([]);
  const [students, setStudents] = useState([]);
  const [fetchstudents, setFetchStudents] = useState([]);
  const [dateTaken, setdateTaken] = useState("");
  const [selectedDay,setSelectedDay] = useState("");
  const [timeTaken, setTimeTaken] = useState("");
  const [selectedSubject, setSelectedSubject] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const [attendance, setAttendance] = useState([]);
  const [className, setclassName] = useState("");
  const [arm, setArm] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const date = new Date();
  const [error, setError] = useState("");
  const [timeerror, setTimeError] = useState("");
  const [msg, setMsg] = useState("");
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  let currentDate = `${day}-${month}-${year}`; // "5-4-2023"

 
  const handleTimeBlur = () => {
    const timeFormat = /^\d{1,2}[ap]m-\d{1,2}[ap]m$/;
    if (!timeFormat.test(timeTaken)) {
      setTimeError(
        "Invalid time range format. Please follow the format: '10am - 11am'"
      );
      setTimeTaken("");
    } else {
      setTimeError("");
    }
  };

  const handleAttendanceSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/takeAttendance/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classId: user.classId,
          classArmId: user.classArmId,
          subjectId:subjectId,
          dateTaken:dateTaken,
          timeTaken:timeTaken,
          attendance: attendance,
        }),
      });
      if (!response.ok) {
        throw new Error("attendance has already been taken");
      }
      setMsg("attendance taken successfully");
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const res = await fetch(`${url}/view`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classId: classId,
          classArmId: classArmId,
        }),
      });
  
      const studs = await res.json();
      setStudents(studs);
      setFetchStudents(studs);
      setSubmitted(true);
      setclassName(studs[0].className);
      setArm(studs[0].classArmName);
      
      setAttendance(
        studs.map((student) => ({
          adNo: student.admissionNumber,
          status: false,
        }))
      );
             const response = await fetch(`${url}/takeAttendance/view`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                classId: classId,
                classArmId:classArmId,
                subjectId:subjectId,
                day:selectedDay,
                dateTaken:dateTaken,
                timeTaken:timeTaken
              }),
            });
            const data = await response.json();
            console.log(data);
      // Rest of your code...
    } catch (err) {
      console.log(err);
    }
  };
  

  const FilterHandle = async (e) => {
    setSelectedClass(e.target.value);
    const value = classes.find((i) => i.className === e.target.value);
    setClassId(value.Id); //classId created to pass to a backend.
    const getArms = async () => {
      const response2 = await fetch(`${url}/arms/getById/${value.Id}`);
      const data2 = await response2.json();
      setArms(data2);

      const response = await fetch(`${url}/takeAttendance/${value.Id}`);
      const data = await response.json();
      setSubjects(data);
    };

    getArms();
  };

  useEffect(() => {
    setMsg("");
    setError("");
  }, []);
 
  const fetchClasses = async() => {
  const response1 = await fetch(`${url}/class/getByASC`);
  const data1 = await response1.json();
  setClasses(data1);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${url}/view`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classId: user.classId,
          classArmId: user.classArmId,
        }),
      });
      const data = await response.json();
      setStudents(data);
      
      setAttendance(
        data.map((student) => ({
          adNo: student.admissionNumber,
          status: false,
        }))
      );
      setclassName(data[0].className);
      setArm(data[0].classArmName);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchClasses();
  }, []);

  return (
    <div>
      <div id="page-top">
        <div id="wrapper">
          <Sidebar1 />

          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar />

              {/* <!-- Container Fluid--> */}
              <div className="container-fluid" id="container-wrapper">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-2 text-gray-800">
                    Take Attendance (Today's Date :{currentDate})
                  </h1>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="./">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      All Student in class
                    </li>
                  </ol>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    {/* Form Basic */}
                    <div className="card mb-4">
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">
                          All Student in {className}-{arm} Class
                        </h6>
                        <h6 className="m-0 font-weight-bold text-danger">
                          Note:{" "}
                          <i>
                            Click on the checkboxes besides each student to take
                            attendance!
                          </i>
                        </h6>
                      </div>
                      <div className="card-body">
                        <form onSubmit={(e) => handleSubmit(e)}>
                          <div className="row mb-2">
                            <div className="col-xl-4 m-2">
                              <label className="form-control-label">
                                Select Date
                                <span className="text-danger ml-2">*</span>
                              </label>
                              <input
                                type="date"
                                required
                                className="form-control"
                                name="dateTaken"
                                value={dateTaken}
                                onChange={(e) => {
                                  setdateTaken(e.target.value);
                                  if (dateTaken) {
                                    const [y, m, d] = dateTaken.split("-");
                                    const dateObject = new Date(`${m}/${d}/${y}`);
                                    const dayOfWeek = dateObject.toLocaleString("en-US", { weekday: "long" });
                                    console.log(dayOfWeek); // Output: Wednesday
                                    setSelectedDay(dayOfWeek);
                                  }
                                
                                }}
                                id="exampleInputFirstName"
                                placeholder="Enter date"
                              />
                            </div>

                            <div className="col-xl-4 m-2">
                              <label className="form-control-label">
                                Select Subject
                                <span className="text-danger ml-2">*</span>
                              </label>
                              {subjects && (
                                <select
                                  required
                                  name="subjectName"
                                  value={selectedSubject}
                                  onChange={(e) => {
                                    setSelectedSubject(e.target.value);
                                    const index = subjects.find(
                                      (i) => i.subjectName === e.target.value
                                    );
                                    setSubjectId(index.Id); // set subject for which the teacher will take attendance.
                                  }}
                                  className="form-control"
                                >
                                  <option value="">--Select Subject--</option>
                                  {subjects.map((item, index) => (
                                    <option
                                      key={index}
                                      value={item.subjectName}
                                    >
                                      {item.subjectName}
                                    </option>
                                  ))}
                                </select>
                              )}
                            </div>

                            <div className="col-xl-4 m-2">
                              <label className="form-control-label">
                                Select Class
                                <span className="text-danger ml-2">*</span>
                              </label>
                              {classes && (
                                <select
                                  required
                                  name="className"
                                  value={selectedClass}
                                  onChange={(e) => FilterHandle(e)}
                                  className="form-control"
                                >
                                  <option value="">--Select Class--</option>
                                  {classes.map((item, index) => (
                                    <option key={index} value={item.className}>
                                      {item.className}
                                    </option>
                                  ))}
                                </select>
                              )}
                              {selectedClass && (
                                <select
                                  required
                                  name="classArmId"
                                  className="form-control mb-3"
                                  onChange={(e) => {
                                    const armId = Arms.find(
                                      (a) => a.classArmName === e.target.value
                                    );
                                    setClassArmId(armId.Id); //classArmId is set by selecting the input field.
                                  }}
                                >
                                  <option value="">--Select Class Arm--</option>
                                  {Arms.map((item, index) => (
                                    <option
                                      key={index}
                                      value={item.classArmName}
                                    >
                                      {item.classArmName}
                                    </option>
                                  ))}
                                </select>
                              )}
                            </div>
                            <div className="col-xl-4 m-2">
                              <label className="form-control-label">
                                Select Time
                                <span className="text-danger ml-2">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                className="form-control"
                                name="timeTaken"
                                value={timeTaken}
                                onChange={(e) => {
                                  setTimeTaken(e.target.value);
                                }}
                                onBlur={(e) => handleTimeBlur(e)}
                                id="exampleInputFirstName"
                                placeholder="Enter Time Range (e.g., 10am - 11am)"
                              />
                              {timeerror && (
                                <div
                                  id="errorContainer"
                                  style={{ color: "red" }}
                                >
                                  {timeerror}
                                </div>
                              )}
                            </div>
                          </div>
                          <button
                            type="submit"
                            name="view"
                            className="btn btn-primary"
                          >
                            View Students
                          </button>
                        </form>

                        <form onSubmit={handleAttendanceSubmit}>
                          <div className="table-responsive p-3">
                            {error && (
                              <div className="alert alert-danger">
                                Attendance has been taken for today!
                              </div>
                            )}

                            {msg && (
                              <div className="alert alert-success">
                                Attendance taken successfully!
                              </div>
                            )}

                            <table className="table align-items-center table-flush table-hover">
                              <thead className="thead-light">
                                <tr>
                                  <th>#</th>
                                  <th>First Name</th>
                                  <th>Last Name</th>
                                  <th>Other Name</th>
                                  <th>Admission No</th>
                                  <th>Class Name</th>
                                  <th>Class Arm</th>
                                  <th>Check</th>
                                </tr>
                              </thead>

                              <tbody>
                                {(submitted?fetchstudents:students) &&
                                  (submitted ? fetchstudents : students).length > 0 &&
                                  (submitted ? fetchstudents : students).map((stud, i) => (
                                    <tr key={i}>
                                      <td>{stud.Id}</td>
                                      <td>{stud.firstName}</td>
                                      <td>{stud.lastName}</td>
                                      <td>{stud.otherName}</td>
                                      <td>{stud.admissionNumber}</td>
                                      <td>{stud.className}</td>
                                      <td>{stud.classArmName}</td>
                                      <td>
                                        <input
                                          name="check"
                                          type="checkbox"
                                          checked={attendance[i]?.status}
                                          onChange={() => {
                                            const updatedAttendance = [
                                              ...attendance,
                                            ];
                                            updatedAttendance[i].status =
                                              !attendance[i]?.status;
                                            setAttendance(updatedAttendance);
                                          }}
                                          className="form-checkbox"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          name="admissionNo"
                                          value=""
                                          type="hidden"
                                        />
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                            <button
                              type="submit"
                              name="save"
                              className="btn btn-primary "
                            >
                              Save Attendance
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeAttendance;
