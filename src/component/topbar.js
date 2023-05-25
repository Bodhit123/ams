/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, memo, useEffect } from "react";
import "../pages/Admin/css/ruang-admin.css";
import { AuthContext } from "./../context/Auth";
import image from "../pages/Admin/img/user-icn.png";
import { NavDropdown } from "react-bootstrap";
import { Dropdown, DropdownButton, Form, Button } from "react-bootstrap";
import $ from 'jquery';

const Topbar = () => {
  const authContext = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const fullName = user.firstName + user.lastName;
  console.log(fullName);

  useEffect(()=> {
 
  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });
  },[])

  return (
    <div>
      <nav className="navbar navbar-expand navbar-light bg-gradient-secondary topbar mb-4 static-top">
        <ul className="navbar-nav ml-auto justify-content-end ">
          <li className="nav-item dropdown no-arrow">
            <DropdownButton
              title={<i className="fas fa-search fa-fw text-white"></i>}
              variant="button"
              style={{ marginTop: "15px", marginLeft: "15px" }}
              drop="left"
            >
              <Dropdown.Header>Search</Dropdown.Header>
              <Dropdown.ItemText>
                <Form className="navbar-search">
                  <Form.Group controlId="searchInput">
                    <Form.Control
                      type="text"
                      placeholder="What do you want to look for?"
                      style={{ borderColor: "#3f51b5" }}
                    />
                  </Form.Group>
                  <Button type="submit">
                    <i className="fas fa-search fa-sm"></i>
                  </Button>
                </Form>
              </Dropdown.ItemText>
            </DropdownButton>
          </li>
          <div className="topbar-divider d-none d-sm-block"></div>
          <li className="nav-item dropdown no-arrow">
            <NavDropdown
              title={
                <span>
                  <img
                    className="img-profile rounded-circle"
                    src={image}
                    style={{ maxWidth: "60px" }}
                    alt="loading"
                  />
                  <span className="ml-2 d-none d-lg-inline text-white small">
                    <b> Welcome {fullName} </b>
                  </span>
                </span>
              }
              id="userDropdown"
              style={{ paddingLeft: "0", paddingRight: "0" }}
            >
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={authContext.signOut}>
                <i className="fas fa-power-off fa-fw mr-2 text-danger"></i>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default memo(Topbar);
