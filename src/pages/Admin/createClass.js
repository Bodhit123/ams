/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback } from "react";
import "./css/ruang-admin.css";
import "./css/ruang-admin.min.css";
import Sidebar from "./../../component/sidebar";
import Topbar from "./../../component/topbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const Createclass = () => {
  const url = "http://localhost:5000";
  const [className, setClassName] = useState("");
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState("");
  const [over, setOver] = useState({ id: "", value: false });
  const [over1, setOver1] = useState({ id: "", value: false });
  const [updateflag, setUpdateflag] = useState(false);
  const [classobj, setClassobj] = useState({
    Id: "",
    className: "",
  });

  const Fetchdata = useCallback(async () => {
    const response = await fetch(`${url}/class`);
    const data = await response.json();
    setClasses(data);
  }, [url]);

  useEffect(() => {
    Fetchdata();
  }, [Fetchdata]);
  console.log("Fetchdata");
  const DeleteHandler = useCallback(
    async (id) => {
      try {
        const response = await fetch(`${url}/class/delete/${id}`, {
          method: "delete",
        });
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
      Fetchdata();
    },
    [Fetchdata, url]
  );

  const updateData = useCallback(async () => {
    try {
      const response = await fetch(`${url}/class/update/${classobj.Id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          className,
        }),
      });

      if (response.status === 200) {
        const resJson = await response.json();
        console.log(resJson);
      }
    } catch (err) {
      console.log(err);
    }
    Fetchdata();
    setClassName("");
    setUpdateflag(false);
  }, [Fetchdata, className, classobj.Id, url]);

  const UpdateHandler = useCallback(
    async (id) => {
      setUpdateflag(true);
      const updateClass = classes.find((i) => i.Id === id);
      setClassName(updateClass.className);
      setClassobj(updateClass);
    },
    [classes]
  );

  const HandleChange = useCallback((e) => {
    setClassName(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        const response = await fetch(`${url}/class`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            className: className,
          }),
        });
        console.log(response);

        if (!response.ok) {
          const data = await response.json();
          console.log(data);
          throw new Error(data);
        }
      } catch (err) {
        setError(err.message);
      }
    },
    [className, url]
  );

  return (
    <div id="page-top">
      <div id="wrapper">
        {/* <!-- Sidebar --> */}
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            {/* <!-- Topbar --> */}
            <Topbar />
            {/* <!-- Container Fluid--> */}
            <div className="container-fluid" id="container-wrapper">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Create class</h1>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="./">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Create class
                  </li>
                </ol>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  {/* <!-- Form Basic --> */}
                  <div className="card mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Create class
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
                              class Name{" "}
                              <span className="text-danger ml-2">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="className"
                              value={className}
                              id="exampleInputFirstName"
                              placeholder="class Name "
                              onChange={HandleChange}
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
                            All classes
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
                                <th>className</th>
                                <th>Edit</th>
                                <th>Delete</th>
                              </tr>
                            </thead>
                            <tbody>
                              {classes &&
                                classes.length > 0 &&
                                classes.map((item, i) => (
                                  <tr key={i}>
                                    <td>{item.Id}</td>
                                    <td>{item.className}</td>
                                    <td>
                                      <FontAwesomeIcon
                                        icon={faEdit}
                                        onMouseOver={() =>
                                          setOver({ id: item.Id, value: true })
                                        }
                                        onMouseLeave={() =>
                                          setOver({ id: item.Id, value: false })
                                        }
                                        style={
                                          over.id === item.Id &&
                                          over.value === true
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
                                          setOver1({
                                            id: item.Id,
                                            value: true,
                                          });
                                        }}
                                        onMouseLeave={() =>
                                          setOver1({
                                            id: item.Id,
                                            value: false,
                                          })
                                        }
                                        style={
                                          over1.id === item.Id &&
                                          over1.value === true
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
              </div>
              {/* // <!---Container Fluid--> */}
            </div>
            {/* //   <!-- Footer --> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createclass;
