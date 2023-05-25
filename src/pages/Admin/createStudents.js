import "../../App.css";
import { useState, useEffect, useContext } from "react";
import Row from "../../row";
import "./css/ruang-admin.css";
import "./css/ruang-admin.min.css";
import Sidebar from "../../component/sidebar";
import Topbar from "../../component/topbar";
import { AuthContext } from "../../context/Auth";
import "bootstrap/dist/css/bootstrap.min.css";

function CreateStudents() {
  const url = "http://localhost:5000";
  const key = "key_local_storage";
  const [students, setStudents] = useState(
    JSON.parse(localStorage.getItem(key)) ?? []
  );
  const authContext = useContext(AuthContext);
  const User = authContext.user;
  console.log("User", User);
  const [id, setId] = useState();
  const [updateflag, setUpdateflag] = useState(false);
  const [password] = useState("12345");
  const [Arms, setArms] = useState([]);
  const [classes, setClasses] = useState([]);
  const [Category, setCategory] = useState();
  const [classId, setClassId] = useState();
  const [classArmId, setClassArmId] = useState();
  const [student, setStudent] = useState({
    Id: "",
    firstName: "",
    lastName: "",
    otherName: "",
    admissionNumber: "",
    password: "",
    classId: "",
    classArmId: "",
    date: "",
  });
  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  const arr = [];
  classes.forEach((object) => {
    arr.push(object.className);
  });

  const arr2 = [];
  Arms.forEach((arm) => {
    arr2.push(arm.classArmName);
  });

  console.log(arr2);
  const FilterHandle = (e) => {
    setCategory(e.target.value);
    const Index = classes.find((i) => i.className === e.target.value);
    setClassId(Index.Id);
    const getClasses = async () => {
      const response2 = await fetch(`${url}/arms/getById/${Index.Id}`);
      const data2 = await response2.json();
      setArms(data2);
    };
    getClasses();
    setStudent((prev) => {
      return { ...prev, classId: Index.Id };
    });
  };

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(students));
  }, [students]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${url}/students/join`);
      const data = await response.json();
      setStudents(data);
      const response1 = await fetch(`${url}/class/getByASC`);
      const data1 = await response1.json();
      setClasses(data1);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log("=======current id=====", id);
  const updateData = async () => {
    const response = await fetch(`${url}/students/update/${student.Id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          firstName: student.firstName,
          lastName: student.lastName,
          otherName: student.otherName,
          admissionNumber: student.admissionNumber,
          password: student.password,
          classId: classId,
          classArmId: classArmId,
          dateCreated: date,
        },
      }),
    });
    const resJson = await response.json();
    console.log(resJson);
    fetchData();
    setUpdateflag(false);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            Id: id,
            firstName: student.firstName,
            lastName: student.lastName,
            otherName: student.otherName,
            admissionNumber: student.admissionNumber,
            password: password,
            classId: classId,
            classArmId: classArmId,
            dateCreated: date,
          },
        }),
      });

      let resJson = await response.json();
      console.log(resJson);
      setId(resJson.data.Id + 1);
    } catch (err) {
      console.log(err);
    }
    fetchData();
  };

  const DeleteHandler = async (id) => {
    try {
      const response = await fetch(`${url}/students/delete/${id}`, {
        method: "delete",
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    fetchData();
  };

  const UpdateHandler = async (id) => {
    setUpdateflag(true);
    const student = students.find((student) => student.Id === id);
    console.log(student);
    setStudent(student);
  };

  return (
    <div id="page-top">
      <div id="wrapper">
        {/* Sidebar  */}
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar />
            <div className="container-fluid" id="container-wrapper">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Create Students</h1>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="./admin">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Create Students
                  </li>
                </ol>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                {/* <!-- Form Basic --> */}
                <div className="card mb-4">
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Create Students
                    </h6>
                    {/* <?php echo $statusMsg; ?> */}
                  </div>
                  <div className="card-body">
                    <form onSubmit={(e) => HandleSubmit(e)}>
                      <div className="form-group row mb-3">
                        <div className="col-xl-6">
                          <label className="form-control-label">
                            Firstname<span className="text-danger ml-2">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            onChange={HandleChange}
                            value={student.firstName}
                            id="exampleInputFirstName"
                          />
                        </div>
                        <div className="col-xl-6">
                          <label className="form-control-label">
                            Lastname<span className="text-danger ml-2">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            onChange={HandleChange}
                            value={student.lastName}
                            id="exampleInputFirstName"
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-3">
                        <div className="col-xl-6">
                          <label className="form-control-label">
                            Other Name
                            <span className="text-danger ml-2">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="otherName"
                            onChange={HandleChange}
                            value={student.otherName}
                            id="exampleInputFirstName"
                          />
                        </div>
                        <div className="col-xl-6">
                          <label className="form-control-label">
                            Admission Number
                            <span className="text-danger ml-2">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="admissionNumber"
                            onChange={HandleChange}
                            value={student.admissionNumber}
                            id="exampleInputFirstName"
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-3">
                        <div className="col-xl-6">
                          <label className="form-control-label">
                            Select Class
                            <span className="text-danger ml-2">*</span>
                          </label>
                          {classes && (
                            <select
                              required
                              className="form-control mb-3"
                              onChange={(e) => FilterHandle(e)}
                            >
                              <option value="">--Select Class--</option>
                              {arr.map((item, index) => {
                                return (
                                  <option key={index} value={item}>
                                    {item}
                                  </option>
                                );
                              })}
                            </select>
                          )}
                        </div>
                        <div className="col-xl-6">
                          <label className="form-control-label">
                            Class Arm<span className="text-danger ml-2">*</span>
                          </label>
                          {Category && (
                            <select
                              required
                              name="classArmId"
                              className="form-control mb-3"
                              onChange={(e) => {
                                const armId = Arms.find(
                                  (a) => a.classArmName === e.target.value
                                );
                                setClassArmId(armId.Id);
                                setStudent((prev) => {
                                  return { ...prev, classArmId: armId.Id };
                                });
                              }}
                            >
                              <option value="">--Select Class Arm--</option>
                              {arr2.map((item, index) => {
                                return (
                                  <option key={index} value={item}>
                                    {item}
                                  </option>
                                );
                              })}
                            </select>
                          )}
                          {/* echo"<div id='txtHint'></div>"; */}
                        </div>
                      </div>

                      {updateflag ? (
                        <button
                          name="update"
                          type="button"
                          className="btn btn-warning"
                          onClick={updateData}
                        >
                          Update
                        </button>
                      ) : (
                        <button
                          type="submit"
                          name="save"
                          className="btn btn-primary"
                        >
                          Save
                        </button>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="card mb-4">
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">
                      All Student
                    </h6>
                  </div>
                  <div className="table-responsive p-3">
                    <table className="table align-items-center table-flush table-hover">
                      <thead className="thead-light">
                        <tr>
                          <th>#</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Other Name</th>
                          <th>Admission No</th>
                          <th>Class</th>
                          <th>Class Arm</th>
                          <th>Date Created</th>
                          <th>Edit</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students &&
                          students.length > 0 &&
                          students.map((studentObj, i) => (
                            <Row
                              key={i}
                              value={studentObj}
                              currentId={i}
                              deletehandle={DeleteHandler}
                              updatehandle={UpdateHandler}
                            />
                          ))}
                      </tbody>
                    </table>
                  </div>
                       <a className="scroll-to-top rounded" href="#page-top" >
                        <i className="fas fa-angle-up"></i>
                      </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreateStudents;
