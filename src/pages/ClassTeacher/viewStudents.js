/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef,useCallback } from "react";
import Footer from "../../component/footer";
import Topbar from "../../component/topbar";
import Sidebar1 from "../../component/sidebar1";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import $ from "jquery";
// import "datatables.net-dt/css/jquery.dataTables.min.css";
// import "datatables.net/js/jquery.dataTables.min.js";
import "../Admin/css/ruang-admin.css";
import "../Admin/css/ruang-admin.min.css";

const ViewStudents = () => {
  // const tableRef = useRef(null);
  const url = "http://localhost:5000";
  const [students, setStudents] = useState([]);
  const [className, setclassName] = useState("");
  const [arm, setArm] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  
  const fetchData = useCallback(async () => {
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
      setclassName(data[0].className);
      setArm(data[0].classArmName);
    } catch (err) {
      console.log(err);
    }
  },[user.classArmId, user.classId]);

  useEffect(() => {
    // $(tableRef.current).DataTable(
    //   {
    //     paging: true,
    //     pageLength: 10,
    //     dom: "<'row'<'col-sm-12 col-md-5'<'pagination-length'l>><'col-sm-12 col-md-7'f>>t<'row'<'col-sm-12 col-md-5'<'pagination-info'i>><'col-sm-12 col-md-7'p>>",
    //   },
    //   { data: students }
    // );
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div id="page-top">
        <div id="wrapper">
          {/* <!-- Sidebar --> */}
          <Sidebar1 />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              {/* <!-- TopBar --> */}
              <Topbar />
              <div className="container-fluid" id="container-wrapper">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">
                    All Student in {className}-{arm} class
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
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card mb-4">
                          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">
                              All Student In class
                            </h6>
                          </div>
                          <div className="table-responsive p-3">
                            <table
                              className="table align-items-center table-flush table-hover"
                              id="dataTableHover"
                              // ref={tableRef}
                            >
                              <thead className="thead-light">
                                <tr>
                                  <th>#</th>
                                  <th>First Name</th>
                                  <th>Last Name</th>
                                  <th>Other Name</th>
                                  <th>Admission No</th>
                                  <th>class</th>
                                  <th>class Arm</th>
                                </tr>
                              </thead>

                              <tbody>
                                {students &&
                                  students.length > 0 &&
                                  students.map((stud, i) => (
                                    <tr key={i}>
                                      <td>{stud.Id}</td>
                                      <td>{stud.firstName}</td>
                                      <td>{stud.lastName}</td>
                                      <td>{stud.otherName}</td>
                                      <td>{stud.admissionNumber}</td>
                                      <td>{stud.className}</td>
                                      <td>{stud.classArmName}</td>
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
              </div>
              <Footer />
              {/* <!-- Footer --> */}
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
    </div>
  );
};

export default ViewStudents;

// import React, { useEffect, useState, useRef } from "react";
// import Footer from "../../component/footer";
// import Topbar from "../../component/topbar";
// import Sidebar1 from "../../component/sidebar1";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import $ from "jquery";
// import "datatables.net-dt/css/jquery.dataTables.min.css";
// import "datatables.net/js/jquery.dataTables.min.js";
// import "../Admin/css/ruang-admin.css";
// import "../Admin/css/ruang-admin.min.css";

// const ViewStudents = () => {
//   const url = "http://localhost:5000";
//   const [students, setStudents] = useState([]);
//   const [className, setClassName] = useState("");
//   const [arm, setArm] = useState("");
//   const tableRef = useRef(null);
//   const user = JSON.parse(localStorage.getItem("user"));
//   const fetchData = async () => {
//     try {
//       const response = await fetch(`${url}/view`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           classId: user.classId,
//           classArmId: user.classArmId,
//         }),
//       });
//       const data = await response.json();
//       setStudents(data);
//       setClassName(data[0].className);
//       setArm(data[0].classArmName);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     const dataTable = $(tableRef.current).DataTable({
//       paging: true,
//       pageLength: 10,
//       lengthChange: true, // Enable show entries dropdown
//       searching: true, // Enable search
//       dom:
//         "<'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'l>>" +
//         "<'row'<'col-sm-12'tr>>" +
//         "<'row'<'col-sm-12 col-md-5'<'pagination-info'i>><'col-sm-12 col-md-7'p>>",
//       language: {
//         emptyTable: "No data available", // Display custom message for empty table
//       },
//     });

//     // Event handler for pagination
//     $(tableRef.current).on("page.dt", () => {
//       const info = dataTable.page.info();
//       console.log("Current page:", info.page); // You can customize this event handler as per your requirement
//     });

//     fetchData();

//     return () => {
//       // Destroy the DataTable instance when the component unmounts
//       dataTable.destroy();
//     };
//   }, []);

//   const handleSearch = () => {
//     const searchValue = $("#dataTableHover_filter input").val();
//     $(tableRef.current)
//       .DataTable()
//       .search(searchValue)
//       .draw();
//   };

//   return (
//     <div>
//       <div id="page-top">
//         <div id="wrapper">
//           {/* Sidebar */}
//           <Sidebar1 />
//           <div id="content-wrapper" className="d-flex flex-column">
//             <div id="content">
//               {/* TopBar */}
//               <Topbar />
//               <div className="container-fluid" id="container-wrapper">
//                 <div className="d-sm-flex align-items-center justify-content-between mb-4">
//                   <h1 className="h3 mb-0 text-gray-800">
//                     All Students in {className}-{arm} class{" "}
//                   </h1>
//                   <ol className="breadcrumb">
//                     <li className="breadcrumb-item">
//                       <a href="./">Home</a>
//                     </li>
//                     <li className="breadcrumb-item active" aria-current="page">
//                       All Students in class
//                     </li>
//                   </ol>
//                 </div>

//                 <div className="row">
//                   <div className="col-lg-12">
//                     <div className="row">
//                       <div className="col-lg-12">
//                         <div className="card mb-4">
//                           <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
//                             <h6 className="m-0 font-weight-bold text-primary">
//                               All Students In class
//                             </h6>
//                             <div className="search-box ml-auto">
//                               <input
//                                 type="search"
//                                 placeholder="Search"
//                                 onChange={handleSearch}
//                               />
//                             </div>
//                           </div>
//                           <div className="table-responsive p-3">
//                             <table
//                               className="table align-items-center table-flush table-hover"
//                               id="dataTableHover"
//                               ref={tableRef}
//                             >
//                               <thead className="thead-light">
//                                 <tr>
//                                   <th>#</th>
//                                   <th>First Name</th>
//                                   <th>Last Name</th>
//                                   <th>Other Name</th>
//                                   <th>Admission No</th>
//                                   <th>Class</th>
//                                   <th>Class Arm</th>
//                                 </tr>
//                               </thead>

//                               <tbody>
//                                 {students.map((stud, i) => (
//                                   <tr key={i}>
//                                     <td>{stud.Id}</td>
//                                     <td>{stud.firstName}</td>
//                                     <td>{stud.lastName}</td>
//                                     <td>{stud.otherName}</td>
//                                     <td>{stud.admissionNumber}</td>
//                                     <td>{stud.className}</td>
//                                     <td>{stud.classArmName}</td>
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <Footer />
//             </div>
//           </div>

//           <a className="scroll-to-top rounded" href="#page-top">
//             <i className="fas fa-angle-up"></i>
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewStudents;
