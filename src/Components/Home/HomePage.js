import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="jumbotron">
    <h1>Raja Kondla and Sheri Begum!</h1>
    <p>This is my app using React and Redux</p>
    <Link to="about" className="btn btn-primary btn-lg">
      Learn more..
    </Link>
  </div>
);

export default HomePage;
