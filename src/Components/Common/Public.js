import React, { useEffect, useState } from "react";

const Public = () => {
  const [response, setMessage] = useState({ message: "" });

  useEffect(() => {
    fetch(process.env.NODE_API_URL + "/public")
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

export default Public;
