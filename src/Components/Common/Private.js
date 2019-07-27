import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Private = ({ getAccessToken }) => {
  const [response, setMessage] = useState({ message: "" });

  useEffect(() => {
    fetch(process.env.NODE_API_URL + "/private", {
      headers: { Authorization: `Bearer ${getAccessToken()}` }
    })
      .then(resp => {
        if (resp.ok) return resp.json();
        else throw new Error("Network response was not ok");
      })
      .then(resp => {
        setMessage({ message: resp.message });
      })
      .catch(err => {
        setMessage({ message: err.message });
      });
  }, []);

  return <p>{response.message}</p>;
};

Private.propTypes = {
  getAccessToken: PropTypes.func.isRequired
};

export default Private;
