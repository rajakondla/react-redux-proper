import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({ login, logout, isAuthenticated, hasScope, callLogout }) => {
  const activeStyle = { color: "#F15B2A" };
  return (
    <>
      <nav>
        <NavLink to="/" activeStyle={activeStyle} exact>
          Home
        </NavLink>
        {"|"}
        <NavLink to="/courses" activeStyle={activeStyle}>
          Courses
        </NavLink>
        {"|"}
        <NavLink to="/about" activeStyle={activeStyle}>
          About
        </NavLink>
        {"|"}
        <NavLink to="/authors" activeStyle={activeStyle}>
          Authors
        </NavLink>
        {"|"}
        <NavLink to="/public" activeStyle={activeStyle}>
          Public
        </NavLink>
        {"|"}
        {isAuthenticated && (
          <NavLink to="/private" activeStyle={activeStyle}>
            Private
          </NavLink>
        )}
        {"|"}
        {isAuthenticated && hasScope(["read:apiCourses"]) && (
          <NavLink to="/apiCourse" activeStyle={activeStyle}>
            API Courses
          </NavLink>
        )}
        <NavLink to="">
          <button
            onClick={() => {
              if (isAuthenticated) {
                callLogout();
                logout();
              } else {
                login();
              }
            }}
          >
            {isAuthenticated ? "Logout" : "Login"}
          </button>
        </NavLink>
      </nav>
    </>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  hasScope: PropTypes.func.isRequired,
  callLogout: PropTypes.func.isRequired
};

export default Header;
