import React from "react";
import { Navbar } from "react-bootstrap";
import logo from "../images/logo.svg";

const PublicNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand className="mr-auto">
        <img src={logo} alt="CoderSchool" width="200px" />
      </Navbar.Brand>
    </Navbar>
  );
};

export default PublicNavbar;
