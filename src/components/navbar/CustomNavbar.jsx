import React, { useContext } from "react";
import { DataProvider } from "../../context/DataContext";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";

import "./CustomNavbar.css";

const style = {
  fontWeight: "bold",
  color: "#f5cc16",
};

const ConditionalCSS = ({ isActive }) => {
  return isActive ? style : undefined;
};

const Dropdown = () => {
  return (
    <NavDropdown
      title="Options"
      id="basic-nav-dropdown"
      className="justify-content-end"
    >
      <NavLink className="nav-dd-item" to={"/profile"} style={ConditionalCSS}>
        Profile
      </NavLink>
      <NavDropdown.Divider />
      <NavLink className="nav-dd-item" to={"/manage"} style={ConditionalCSS}>
        Manage
      </NavLink>
      <NavDropdown.Divider />
      <NavLink className="nav-dd-item" to={"/logout"} style={ConditionalCSS}>
        Logout
      </NavLink>
    </NavDropdown>
  );
};

export const CustomNavbar = () => {
  const {
    userInfo: { isLogged },
  } = useContext(DataProvider);

  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#home"> Task Manager</Navbar.Brand>
        <Nav className="me-auto">
          <NavLink className="nav-link" to={"/"} style={ConditionalCSS}>
            Home
          </NavLink>
          {!isLogged ? (
            <NavLink
              className="nav-link justify-content-end"
              to={"/login"}
              style={ConditionalCSS}
            >
              Login
            </NavLink>
          ) : (
            <Dropdown />
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
