/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import Sidebar from "../../component/sidebar";
import Topbar from "../../component/topbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-regular-svg-icons";

const CreateclassArms = () => {
  const url = "http://localhost:5000";
  const [error, setError] = useState("");
  const [over, setOver] = useState({id:"",value:false});
  const [over1, setOver1] = useState({id:"",value:false});
  const [updateflag, setUpdateflag] = useState(false);
  const [classArm, setClassArm] = useState({
    Id: "",
    className: "",
    classArmName: "",
    status: "",
  });
  const [arms, setArms] = useState([]);
  const [Classes, setClasses] = useState([]);
  console.log(Classes);
  const arr = [];
  Classes.forEach((object) => {
    arr.push(object.className);
  });

  const fetchData = async () => {
    try {
      const response = await fetch(`${url}/arms/join`);
      const data = await response.json();
      setArms(data);
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

  const FilterHandle = (e) => {
    const SelectedClassId = Classes.find(
      (a) => a.className === e.target.value
    ).Id;
    setClassArm((prev) => {
      return { ...prev, classId: SelectedClassId };
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(`${url}/arms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classId: classArm.classId,
          classArmName: classArm.classArmName,
        }),
      });
      console.log(response);

      //   if (response.status === 200) {
      //     let resJson = await response.json();
      //     console.log(resJson);
      //   } else if (response.status === 404) {
      //     const data =await  response.json();
      //     setError(data.message);
      //     console.log(data);
      //   }
      // }

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        throw new Error(data);
      }
    } catch (err) {
      setError(err.message);
    }
    fetchData();
  };

  const updateData = async () => {
    try {
      const response = await fetch(`${url}/arms/update/${classArm.Id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classId: classArm.classId,
          classArmName: classArm.classArmName,
        }),
      });

      if (response.status === 200) {
        const resJson = await response.json();
        console.log(resJson);
      }
    } catch (err) {
      console.log(err);
    }
    fetchData();
    setUpdateflag(false);
  };

  const DeleteHandler = async (id) => {
    try {
      const response = await fetch(`${url}/arms/delete/${id}`, {
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
    const updateArm = arms.find((i) => i.Id === id);
    setClassArm(updateArm);
  };

  return (
    <div id="page-top">
      <div id="wrapper">
        {/* <!-- Sidebar --> */}
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            {/* <!-- TopBar --> */}
            <Topbar />
            {/* <!-- Container Fluid--> */}
            <div className="container-fluid" id="container-wrapper">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Create class Arms</h1>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="./">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Create class Arms
                  </li>
                </ol>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  {/* <!-- Form Basic --> */}
                  <div className="card mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Create class Arms
                      </h6>
                      {error ? (
                        <div
                          className="alert alert-danger alert-dismissible fade show js-alert"
                          role="alert"
                          style={{ padding: "5px", marginRight: "700px" }}
                        >
                          {error}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="card-body">
                      <form onSubmit={(e) => handleSubmit(e)} autoComplete="on">
                        <div className="form-group row mb-3">
                          <div className="col-xl-6">
                            <label className="form-control-label">
                              Select class
                              <span className="text-danger ml-2">*</span>
                            </label>

                            {Classes && (
                              <select
                                required
                                name="classId"
                                className="form-control mb-3"
                                onChange={(e) => {
                                  FilterHandle(e);
                                }}
                              >
                                <option value="">--Select class--</option>
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
                              class Arm Name
                              <span className="text-danger ml-2">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="classArmName"
                              value={classArm.classArmName}
                              onChange={(e) =>
                                setClassArm((prev) => {
                                  return {
                                    ...prev,
                                    classArmName: e.target.value,
                                  };
                                })
                              }
                              id="exampleInputFirstName"
                              placeholder="class Arm Name"
                            />
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

                  {/* //   <!-- Input Group --> */}
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                          <h6 className="m-0 font-weight-bold text-primary">
                            All class Arm
                          </h6>
                        </div>
                        <div className="table-responsive p-3">
                          <table
                            className="table align-items-center table-flush table-hover"
                            id="dataTableHover"
                          >
                            <thead className="thead-light">
                              <tr>
                                <th>#</th>
                                <th>class Name</th>
                                <th>class Arm Name</th>
                                <th>Status</th>
                                <th>Edit</th>
                                <th>Delete</th>
                              </tr>
                            </thead>

                            <tbody>
                              {arms &&
                                arms.length > 0 &&
                                arms.map((item, i) => (
                                  <tr key={i}>
                                    <td>{item.Id}</td>
                                    <td>{item.className}</td>
                                    <td>{item.classArmName}</td>
                                    <td>{item.isAssigned}</td>
                                    <td>
                                      <FontAwesomeIcon
                                        icon={faEdit}
                                        onMouseOver={() => setOver({id:item.Id,value:true})}
                                        onMouseLeave={() => setOver({id:item.Id,value:false})}
                                        style={
                                          over.id === item.Id && over.value === true
                                            ? {
                                                color: "blue",
                                                cursor: "pointer",
                                              }
                                            : {}
                                        }
                                        onClick={() => UpdateHandler(item.Id)}
                                      />
                                      Edit
                                    </td>
                                    <td>
                                      <FontAwesomeIcon
                                        icon={faTrashCan}
                                        onMouseOver={() => {
                                          setOver1({id:item.Id,value:true});
                                        }}
                                        onMouseLeave={() => setOver1({id:item.Id,value:false})}
                                        style={
                                          over1.id === item.Id && over1.value === true
                                            ? {
                                                color: "red",
                                                cursor: "pointer",
                                              }
                                            : {}
                                        }
                                        onClick={() => DeleteHandler(item.Id)}
                                      />
                                      Delete
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!--Row-->

          <!-- Documentation Link -->
          <!-- <div className="row">
            <div className="col-lg-12 text-center">
              <p>For more documentations you can visit<a href="https://getbootstrap.com/docs/4.3/components/forms/"
                  target="_blank">
                  bootstrap forms documentations.</a> and <a
                  href="https://getbootstrap.com/docs/4.3/components/input-group/" target="_blank">bootstrap input
                  groups documentations</a></p>
            </div>
          </div> --> */}
              </div>
              {/* <!---Container Fluid--> */}
            </div>
            {/* <!-- Footer --> */}
          </div>
        </div>

        {/* <!-- Scroll to top -->
  <a className="scroll-to-top rounded" href="#page-top">
    <i className="fas fa-angle-up"></i>
  </a>

  <script src="../vendor/jquery/jquery.min.js"></script>
  <script src="../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="../vendor/jquery-easing/jquery.easing.min.js"></script>
  <script src="js/ruang-admin.min.js"></script>
   <!-- Page level plugins -->
  <script src="../vendor/datatables/jquery.dataTables.min.js"></script>
  <script src="../vendor/datatables/dataTables.bootstrap4.min.js"></script>

  <!-- Page level custom scripts -->
  <script>
    $(document).ready(function () {
      $('#dataTable').DataTable(); // ID From dataTable 
      $('#dataTableHover').DataTable(); // ID From dataTable with Hover
    });
  </script> */}
      </div>
    </div>
  );
};

export default CreateclassArms;
