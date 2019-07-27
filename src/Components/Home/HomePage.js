import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const HomePage = ({ login, isAuthenticated }) => {
  return (
    <div className="jumbotron">
      <h1>Raja Kondla</h1>
      <p>This is my app using React and Redux</p>
      <Link to="about" className="btn btn-primary btn-lg">
        Learn more..
      </Link>
      <div>
        {isAuthenticated ? (
          <Link to="/profile">View Profile</Link>
        ) : (
          <button onClick={login}>Log in</button>
        )}
      </div>
    </div>
  );
};

HomePage.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default HomePage;
