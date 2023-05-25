/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Collapse } from "react-bootstrap";
import logoimage from "../pages/Admin/img/logo/attnlg.jpg";
import "../pages/Admin/css/ruang-admin.css";
import { Link } from "react-router-dom";
import * as XLSX from 'xlsx';

const Sidebar1 = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const initialItems = [
    {
      title: "STUDENTS",
      Items: [
        {
          id: 0,
          icon: "fas fa-user-graduate",
          linkText: ["View Students"],
          text: "Manage Students",
          link: "teacher/viewStudent",
          status: { isOpen: false },
        },
      ],
    },

    {
      title: "ATTENDANCE",
      Items: [
        {
          id: 0,
          icon: "fas fa-chalkboard-teacher",
          linkText: [
            "Take Attendance",
            "View Class Attendance",
            "View Student Attendance",
            "Today's Reports",
          ],
          text: "Manage Attendance",
          link: [
            "takeAttendance",
            "viewClassAttendance",
            "viewStudentAttendance",
            "report",
          ],
          status: { isOpen: false },
        },
      ],
    },
  ];

  // This code creates a temporary link element, 
  // sets the necessary attributes for downloading the file, 
  // and simulates a click event to trigger the download.

  const downloadReport = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000";
      const response = await fetch(`${url}/generate_reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classId: user.classId,
          classArmId: user.classArmId,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        const filename = "Attendance list";
        const dateTaken = new Date().toISOString().slice(0, 10);
  
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Student Data");
        const excelData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelData], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const url = URL.createObjectURL(blob);
  
        // Create a temporary link element and simulate click event
        const link = document.createElement("a");
        link.href = url;
        link.download = `${filename}-${dateTaken}.xlsx`;
        link.click();
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  const [dataItems, setdataItems] = useState(initialItems);
  const HandleClick = (id, title, i) => {
    const index = dataItems.findIndex((it) => it.title === title);
    const navItem = dataItems.find((it) => it.title === title);
    const item = navItem.Items[id];
    const newArr = [...dataItems];
    newArr[index].Items[id].status.isOpen = item.status.isOpen ? false : true;
    setdataItems(newArr);
  };

  return (
    <>
      <ul
        className="navbar-nav sidebar sidebar-light accordion"
        id="accordionSidebar"
      >
        <a
          className="sidebar-brand d-flex align-items-center bg-gradient-primary "
          href="#"
        >
          <div className="sidebar-brand-icon">
            <img src={logoimage} alt="" />
          </div>
          <div className="sidebar-brand-text mx-2">AMS</div>
        </a>
        <hr className="sidebar-divider my-0" />
        <li className="nav-item active">
          <a className="nav-link" href="#">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <hr className="sidebar-divider" />

        {dataItems.map((item, i) => (
          <div key={i}>
            <div className="sidebar-heading">{item.title}</div>
            {item.Items.map((navItem, i) => (
              <div key={i}>
                <li
                  className="nav-item p-0 m-1"
                  onClick={() => HandleClick(navItem.id, item.title)}
                >
                  <a
                    className="nav-link collapsed p-2"
                    href="#"
                    data-toggle="collapse"
                    data-target={navItem.text}
                    aria-expanded={navItem.status.isOpen}
                    aria-controls={navItem.text}
                  >
                    <i className={navItem.icon}></i>
                    <span>{navItem.text}</span>
                  </a>
                  <Collapse
                    in={navItem.status.isOpen}
                    className="collapse"
                    id={navItem.text}
                    data-parent="#accordionSidebar"
                  >
                    <div className="bg-white p-1 card m-2 border-0 collapse-inner rounded">
                      <h6
                        className="collapse-header text-uppercase"
                        style={{ paddingLeft: "10px" }}
                      >
                        {navItem.text}
                      </h6>
                      {/* {navItem.linkText.map((it, i) => (
                        <Link
                          key={i}
                          to={`/teacher/${it.replaceAll(" ", "")}`}
                          className="collapse-item "
                          style={{
                            textDecoration: "none",
                            paddingLeft: "10px",
                            paddingBottom: "8px",
                          }}
                        >
                          {it}
                        </Link>
                      ))} */}
                      {navItem.linkText.map((it, i) =>
                        it === "Today's Reports" ? (
                          <Link
                            key={i}
                            onClick={(e) => downloadReport(e)}
                            className="collapse-item "
                            style={{
                              textDecoration: "none",
                              paddingLeft: "10px",
                              paddingBottom: "8px",
                            }}
                          >
                            {it}
                          </Link>
                        ) : (
                          <Link
                            key={i}
                            to={`/teacher/${it.replaceAll(" ", "")}`}
                            className="collapse-item "
                            style={{
                              textDecoration: "none",
                              paddingLeft: "10px",
                              paddingBottom: "8px",
                            }}
                          >
                            {it}
                          </Link>
                        )
                      )}
                    </div>
                  </Collapse>
                </li>
              </div>
            ))}
            <hr className="sidebar-divider mt-0" />
          </div>
        ))}
      </ul>
    </>
  );
};

export default Sidebar1;
