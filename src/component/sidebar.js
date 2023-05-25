/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {  useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Collapse } from "react-bootstrap";
import logoimage from "../pages/Admin/img/logo/attnlg.jpg";
import "../pages/Admin/css/ruang-admin.css";
import { Link } from "react-router-dom";


const Sidebar = () => {

  const initialItems = [
    {
      title: "CLASS AND CLASS ARMS",
      Items: [
        {
          id: 0,
          icon: "fas fa-chalkboard",
          linkText: "Create classes",
          text: "Manage Classes",
          link: "/classes",
          status: { isOpen: false },
        },
        {
          id: 1,
          icon: "fas fa-code-branch",
          linkText: "Create class Arms ",
          text: "Manage Class Arms",
          link: "/arms",
          status: { isOpen: false },
        },
      ],
    },

    {
      title: "TEACHERS",
      Items: [
        {
          id: 0,
          icon: "fas fa-chalkboard-teacher",
          linkText: "Create Teachers",
          text: "Manage Teachers",
          link: "/teachers",
          status: { isOpen: false },
        },
      ],
    },

    {
      title: "STUDENTS",
      Items: [
        {
          id: 0,
          icon: "fas fa-user-graduate",
          linkText: "Create Students",
          text: "Manage Students",
          link: "/students",
          status: { isOpen: false },
        },
      ],
    },

    {
      title: "SESSION AND TERM",
      Items: [
        {
          id: 0,
          icon: "fas fa-user-graduate",
          linkText: "Create Session and Term",
          text: "Manage Session & Term",
          link: "/session",
          status: { isOpen: false },
        },
      ],
    },
  ];

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
          className="sidebar-brand d-flex align-items-center bg-gradient-primary"
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
                    data-target={navItem.linkText}
                    aria-expanded={navItem.status.isOpen}
                    aria-controls={navItem.linkText}
                  >
                    <i className={navItem.icon}></i>
                    <span>{navItem.text}</span>
                  </a>
                  <Collapse
                    in={navItem.status.isOpen}
                    className="collapse"
                    id={navItem.linkText}
                    data-parent="#accordionSidebar"
                  >
                    <div className="bg-white p-2 card m-3 text-center border-0 collapse-inner rounded">
                      <h6 className="collapse-header text-uppercase">
                        {navItem.text}
                      </h6>
                      <Link
                        to={`/admin${navItem.link}`}
                        className="collapse-item"
                        style={{ textDecoration: "none" }}
                      >
                        {navItem.linkText}
                      </Link>
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

export default Sidebar;
